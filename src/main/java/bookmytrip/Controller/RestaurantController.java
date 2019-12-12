package bookmytrip.Controller;

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
public class RestaurantController {
	
	// TODO: create tests
	// TODO: adapt City enum
	
	private final RestaurantRepository restaurantRepo;
	
	@GetMapping
	public ResponseEntity<?> index(@PathVariable String city) {
		
		var maybeRestaurants = Optional.of(restaurantRepo
				.findByCity(city));		
		return ResponseEntity.of(maybeRestaurants);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> show(
			@PathVariable Long id,
			@PathVariable String city) {
		
		var maybeRestaurant = Optional.of(restaurantRepo
				.findByCityAndId(city, id));
		return ResponseEntity.of(maybeRestaurant);
	}
		
	@GetMapping("/search")
	public ResponseEntity<?> showByName(
			@PathVariable String city, 
			@RequestParam(required = false) String name) {
		
		var maybeRestaurants = Optional.of(restaurantRepo
				.findByCityAndNameOrderByRating(city, name));
		return ResponseEntity.of(maybeRestaurants);
	}
	
	@GetMapping("/filter")
	public ResponseEntity<?> showByFilter(
			@PathVariable String city, 
			@RequestParam(required = false) String cuisine, 
			@RequestParam(required = false) Integer priceLevel,
			@RequestParam(required = false) Integer rating) {
		
		List<Restaurant> maybeRestaurants = null;
		
		// TODO: filter by several cuisines (for instance, Italian + German)
		
		if (cuisine != null) {
			maybeRestaurants = restaurantRepo.findByCityAndCuisineOrderByName(city, cuisine);
		}
		
		// TODO: filter by several price levels (for instance, cheap + medium)
		
		if (maybeRestaurants != null && priceLevel != null) {
			maybeRestaurants.retainAll(restaurantRepo
					.findByCityAndPriceLevelOrderByPriceLevel(city, priceLevel));
		} else if (priceLevel != null) {
			maybeRestaurants = restaurantRepo
					.findByCityAndPriceLevelOrderByPriceLevel(city, priceLevel);
		}
		
		if (maybeRestaurants != null && rating != null) {
			maybeRestaurants.retainAll(restaurantRepo
					.findByCityAndRatingOrderByName(city, rating));
		} else if (rating != null) {
			maybeRestaurants = restaurantRepo
					.findByCityAndRatingOrderByName(city, rating);
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
