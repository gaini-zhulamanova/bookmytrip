package backend.src.main.java.bookmytrip.Controller;

import java.util.*;

import javax.validation.Valid;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import bookmytrip.Entity.Restaurant;
import bookmytrip.Repository.RestaurantRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book-my-trip/{city}/restaurants")
@CrossOrigin("http://localhost:4205")
public class RestaurantController {
	
	// TODO: create tests
	
	private final RestaurantRepository restaurantRepo;
	
	@GetMapping
	public ResponseEntity<?> index(@PathVariable String city) {
		
		List<Restaurant> maybeRestaurants = restaurantRepo.findByCity(city);		
		return ResponseEntity.of(Optional.of(maybeRestaurants));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> show(
			@PathVariable Long id,
			@PathVariable String city) {
		
		Optional<Restaurant> maybeRestaurant = restaurantRepo.findByCityAndId(city, id);
		return ResponseEntity.of(maybeRestaurant);
	}
		
	@GetMapping("/search")
	public ResponseEntity<?> showByName(
			@PathVariable String city, 
			@RequestParam(required = false) String name) {
		// moved the body to the separate method in repository	
		return ResponseEntity.of(restaurantRepo.findByName(city, name));
	}
	
	@GetMapping("/filter")
	public ResponseEntity<?> showByFilter(
			@PathVariable String city, 
			@RequestParam(required = false) String cuisine, 
			@RequestParam(required = false) Integer price,
			@RequestParam(required = false) Integer rating) {
		
		List<Restaurant> maybeRestaurants = null;
		
		// TODO: filter by several cuisines (for instance, Italian + German)
		
		if (cuisine != null) {
			maybeRestaurants = restaurantRepo.filterByCuisine(city, cuisine);
		}
		
		// TODO: filter by several price levels (for instance, cheap + medium)
		
		if (maybeRestaurants != null && price != null) {
			maybeRestaurants.retainAll(restaurantRepo
					.filterByPriceLevel(city, price));
		} else if (price != null) { // maybeRestaurants == null is unnecessary
			maybeRestaurants = restaurantRepo
					.filterByPriceLevel(city, price);
		}
		
		if (maybeRestaurants != null && rating != null) {
			maybeRestaurants.retainAll(restaurantRepo
					.filterByRaitingPoints(city, rating));
		} else if (rating != null) { // maybeRestaurants == null is unnecessary
			maybeRestaurants = restaurantRepo
					.filterByRaitingPoints(city, rating);
		}
		
		return ResponseEntity.of(Optional.of(maybeRestaurants));		
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Restaurant create(
			@PathVariable String city,
			@RequestBody @Valid Restaurant restaurant) {
		
		restaurant.setId(null);
		restaurant.setCity(city);
		return restaurantRepo.save(restaurant);
	}	
	
	@PutMapping("/{id}")
	public ResponseEntity<?> update(
			@PathVariable Long id,
			@PathVariable String city, 
			@RequestBody @Valid Restaurant restaurant) {
		
		restaurant.setId(id);
		restaurant.setCity(city);
		if (restaurantRepo.findByCityAndId(city, id).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		restaurantRepo.save(restaurant);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(
			@PathVariable Long id,
			@PathVariable String city) {
		
		if (restaurantRepo.findByCityAndId(city, id).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		restaurantRepo.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
