package bookmytrip.Controller;

import java.util.*;

import javax.validation.Valid;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import bookmytrip.Entity.Hotel;
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
		
		var maybeHotels = Optional.of(hotelRepo
				.findByCity(city));		
		return ResponseEntity.of(maybeHotels);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> show(
			@PathVariable Long id,
			@PathVariable String city) {
		
		var maybeHotels = Optional.of(hotelRepo
				.findByCityAndId(city, id));
		return ResponseEntity.of(maybeHotels);
	}
	
	@GetMapping("/filter")
	public ResponseEntity<?> showByFilter(
			@PathVariable String city, 
			@RequestParam(required = false) Boolean breakfast, 
			@RequestParam(required = false) Integer stars,
			@RequestParam(required = false) Integer rating) {
		
		List<Hotel> maybeHotels = null;
		
		if (breakfast != null) {
			maybeHotels = hotelRepo.findByCityAndBreakfastInclOrderByName(city, breakfast);
		}
		
		// TODO: filter by several stars (for instance, 3* + 4*)
		
		if (maybeHotels != null && stars != null) {
			maybeHotels.retainAll(hotelRepo
					.findByCityAndStarsOrderByName(city, stars));
		} else if (stars != null) { // maybeHotels == null is unnecessary
			maybeHotels = hotelRepo
					.findByCityAndStarsOrderByName(city, stars);
		}
		
		if (maybeHotels != null && rating != null) {
			maybeHotels.retainAll(hotelRepo
					.findByCityAndRatingOrderByName(city, rating));
		} else if (rating != null) { // maybeHotels == null is unnecessary
			maybeHotels = hotelRepo
					.findByCityAndRatingOrderByName(city, rating);
		}
		
		return ResponseEntity.of(Optional.of(maybeHotels));		
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Hotel create(
			@PathVariable String city,
			@RequestBody @Valid Hotel hotel) {
		
		hotel.setId(null);
		hotel.setCity(city);
		return hotelRepo.save(hotel);
	}	
	
	@PutMapping("/{id}")
	public ResponseEntity<?> update(
			@PathVariable Long id,
			@RequestBody @Valid Hotel hotel, 
			@PathVariable String city) {
		
		hotel.setId(id);
		hotel.setCity(city);
		if (hotelRepo.findByCityAndId(city, id).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		hotelRepo.save(hotel);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(
			@PathVariable Long id,
			@PathVariable String city) {	
		
		if (hotelRepo.findByCityAndId(city, id).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		hotelRepo.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
