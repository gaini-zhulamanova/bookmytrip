package bookmytrip.Controller;

import java.util.*;

import javax.validation.Valid;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import bookmytrip.Entity.*;
import bookmytrip.Repository.HotelRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book-my-trip/{city}/hotels")
public class HotelController {
	
	private final HotelRepository hotelRepo;
	
	@GetMapping
	public List<Hotel> index(@PathVariable String city) {
		
		City enumCity = City.convertToEnum(city);
		return hotelRepo.findByContactCity(enumCity);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> showById(
			@PathVariable Long id,
			@PathVariable String city) {
		
		City enumCity = City.convertToEnum(city);
		var maybeHotels = Optional.of(hotelRepo
				.findByContactCityAndId(enumCity, id));
		return ResponseEntity.of(maybeHotels);
	}
	
	@GetMapping("/search")
	public List<Hotel> showByName(
			@PathVariable String city, 
			@RequestParam(required = false) String name) {
		
		City enumCity = City.convertToEnum(city);
		return hotelRepo.findByCityAndNameOrderByRating(enumCity, name);
	}
	
	@GetMapping("/filter")
	public List<Hotel> showByFilter(
			@PathVariable String city, 
			@RequestParam(required = false) Boolean breakfast, 
			@RequestParam(required = false) Integer stars,
			@RequestParam(required = false) Integer rating) {
		
		List<Hotel> maybeHotels = null;		
		City enumCity = City.convertToEnum(city);	
		
		if (breakfast != null) {
			maybeHotels = hotelRepo.findByContactCityAndBreakfastInclOrderByName(enumCity, breakfast);
		}
		
		if (maybeHotels != null && stars != null) {
			maybeHotels.retainAll(hotelRepo
					.findByContactCityAndStarsOrderByName(enumCity, stars));
		} else if (stars != null) {
			maybeHotels = hotelRepo
					.findByContactCityAndStarsOrderByName(enumCity, stars);
		}
		
		if (maybeHotels != null && rating != null) {
			maybeHotels.retainAll(hotelRepo
					.findByCityAndRatingOrderByName(enumCity, rating));
		} else if (rating != null) {
			maybeHotels = hotelRepo
					.findByCityAndRatingOrderByName(enumCity, rating);
		}
		
		return maybeHotels;		
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Hotel create(
			@PathVariable String city,
			@RequestBody @Valid Hotel hotel) {
		
		City enumCity = City.convertToEnum(city);
		hotel.setId(null);
		hotel.getContact().setCity(enumCity);
		return hotelRepo.save(hotel);
	}	
	
	@PutMapping("/{id}")
	public ResponseEntity<?> update(
			@PathVariable Long id,
			@RequestBody @Valid Hotel hotel, 
			@PathVariable String city) {
		
		City enumCity = City.convertToEnum(city);
		hotel.setId(id);
		hotel.getContact().setCity(enumCity);	
		hotel.setNumOfReviews(hotelRepo.updateNumOfReviews(enumCity, id));
		hotel.setAvrgRating(hotelRepo.updateAvrgRating(enumCity, id));

		if (hotelRepo.findByContactCityAndId(enumCity, id).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		hotelRepo.save(hotel);
		return new ResponseEntity<>(HttpStatus.OK);		
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(
			@PathVariable Long id,
			@PathVariable String city) {	
		
		City enumCity = City.convertToEnum(city);
		if (hotelRepo.findByContactCityAndId(enumCity, id).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		hotelRepo.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
