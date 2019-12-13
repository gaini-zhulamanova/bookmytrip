package bookmytrip.Controller;

import java.util.*;

import javax.validation.Valid;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import bookmytrip.Entity.*;
import bookmytrip.Repository.RestaurantRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book-my-trip/{city}/restaurants")
@CrossOrigin("http://localhost:4200")
public class RestaurantController {
	
	// TODO: create tests
	
	private final RestaurantRepository restaurantRepo;
	
	@GetMapping
	public ResponseEntity<?> index(@PathVariable String city) {
		
		City enumCity = City.convertToEnum(city);
		var maybeRestaurants = Optional.of(restaurantRepo
				.findByCity(enumCity));		
		return ResponseEntity.of(maybeRestaurants);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> show(
			@PathVariable Long id,
			@PathVariable String city) {
		
		City enumCity = City.convertToEnum(city);
		var maybeRestaurant = Optional.of(restaurantRepo
				.findByCityAndId(enumCity, id));
		return ResponseEntity.of(maybeRestaurant);
	}
		
	@GetMapping("/search")
	public ResponseEntity<?> showByName(
			@PathVariable String city, 
			@RequestParam(required = false) String name) {
		
		City enumCity = City.convertToEnum(city);
		var maybeRestaurants = Optional.of(restaurantRepo
				.findByCityAndNameOrderByRating(enumCity, name));
		return ResponseEntity.of(maybeRestaurants);
	}
	
	@GetMapping("/filter")
	public ResponseEntity<?> showByFilter(
			@PathVariable String city, 
			@RequestParam(required = false) String cuisine, 
			@RequestParam(required = false) Integer priceLevel,
			@RequestParam(required = false) Integer rating) {
		
		List<Restaurant> maybeRestaurants = null;
		City enumCity = City.convertToEnum(city);
		
		// TODO: filter by several cuisines (for instance, Italian + German)
		
		if (cuisine != null) {
			maybeRestaurants = restaurantRepo.findByCityAndCuisineOrderByName(enumCity, cuisine);
		}
		
		// TODO: filter by several price levels (for instance, cheap + medium)
		
		if (maybeRestaurants != null && priceLevel != null) {
			maybeRestaurants.retainAll(restaurantRepo
					.findByCityAndPriceLevelOrderByPriceLevel(enumCity, priceLevel));
		} else if (priceLevel != null) {
			maybeRestaurants = restaurantRepo
					.findByCityAndPriceLevelOrderByPriceLevel(enumCity, priceLevel);
		}
		
		if (maybeRestaurants != null && rating != null) {
			maybeRestaurants.retainAll(restaurantRepo
					.findByCityAndRatingOrderByName(enumCity, rating));
		} else if (rating != null) {
			maybeRestaurants = restaurantRepo
					.findByCityAndRatingOrderByName(enumCity, rating);
		}
		
		return ResponseEntity.of(Optional.of(maybeRestaurants));		
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Restaurant create(
			@PathVariable String city,
			@RequestBody @Valid Restaurant restaurant) {
		
		City enumCity = City.convertToEnum(city);
		restaurant.setId(null);
		restaurant.setCity(enumCity);
		return restaurantRepo.save(restaurant);
	}	
	
	@PutMapping("/{id}")
	public ResponseEntity<?> update(
			@PathVariable Long id,
			@PathVariable String city, 
			@RequestBody @Valid Restaurant restaurant) {
		
		City enumCity = City.convertToEnum(city);
		restaurant.setId(id);
		restaurant.setCity(enumCity);
		if (restaurantRepo.findByCityAndId(enumCity, id).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		restaurantRepo.save(restaurant);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(
			@PathVariable Long id,
			@PathVariable String city) {
		
		City enumCity = City.convertToEnum(city);
		if (restaurantRepo.findByCityAndId(enumCity, id).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		restaurantRepo.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
