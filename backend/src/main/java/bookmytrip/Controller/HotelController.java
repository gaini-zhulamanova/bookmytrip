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
	
	// TODO: create tests
	
	private final HotelRepository hotelRepo;
	
	@GetMapping
	public ResponseEntity<?> index(@PathVariable String city) {
		
		City enumCity = City.convertToEnum(city);
		var maybeHotels = Optional.of(hotelRepo
				.findByCity(enumCity));		
		return ResponseEntity.of(maybeHotels);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> show(
			@PathVariable Long id,
			@PathVariable String city) {
		
		City enumCity = City.convertToEnum(city);
		var maybeHotels = Optional.of(hotelRepo
				.findByCityAndId(enumCity, id));
		return ResponseEntity.of(maybeHotels);
	}
	
	@GetMapping("/search")
	public ResponseEntity<?> showByName(
			@PathVariable String city, 
			@RequestParam(required = false) String name) {
		
		City enumCity = City.convertToEnum(city);
		var maybeHotels = Optional.of(hotelRepo
				.findByCityAndNameOrderByRating(enumCity, name));
		return ResponseEntity.of(maybeHotels);
	}
	
	@GetMapping("/filter")
	public ResponseEntity<?> showByFilter(
			@PathVariable String city, 
			@RequestParam(required = false) Boolean breakfast, 
			@RequestParam(required = false) Integer stars,
			@RequestParam(required = false) Integer rating) {
		
		List<Hotel> maybeHotels = null;		
		City enumCity = City.convertToEnum(city);	
		
		if (breakfast != null) {
			maybeHotels = hotelRepo.findByCityAndBreakfastInclOrderByName(enumCity, breakfast);
		}
		
		// TODO: filter by several stars (for instance, 3* + 4*)
		
		if (maybeHotels != null && stars != null) {
			maybeHotels.retainAll(hotelRepo
					.findByCityAndStarsOrderByName(enumCity, stars));
		} else if (stars != null) {
			maybeHotels = hotelRepo
					.findByCityAndStarsOrderByName(enumCity, stars);
		}
		
		if (maybeHotels != null && rating != null) {
			maybeHotels.retainAll(hotelRepo
					.findByCityAndRatingOrderByName(enumCity, rating));
		} else if (rating != null) {
			maybeHotels = hotelRepo
					.findByCityAndRatingOrderByName(enumCity, rating);
		}
		
		return ResponseEntity.of(Optional.of(maybeHotels));		
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Hotel create(
			@PathVariable String city,
			@RequestBody @Valid Hotel hotel) {
		
		City enumCity = City.convertToEnum(city);
		hotel.setId(null);
		hotel.setCity(enumCity);
		return hotelRepo.save(hotel);
	}	
	
	@PutMapping("/{id}")
	public ResponseEntity<?> update(
			@PathVariable Long id,
			@RequestBody @Valid Hotel hotel, 
			@PathVariable String city) {
		
		City enumCity = City.convertToEnum(city);	
		hotel.setId(id);
		hotel.setCity(enumCity);
		if (hotelRepo.findByCityAndId(enumCity, id).isEmpty()) {
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
		if (hotelRepo.findByCityAndId(enumCity, id).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		hotelRepo.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
