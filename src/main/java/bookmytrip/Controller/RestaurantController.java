package bookmytrip.Controller;

import java.util.*;

import javax.validation.Valid;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import bookmytrip.Entity.Cuisine;
import bookmytrip.Entity.Restaurant;
import bookmytrip.Repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book-my-trip/{city}/restaurants")
public class RestaurantController {
	
	// TODO: create tests
	
	private final RestaurantRepository restaurantRepo;
	
	@GetMapping
	public ResponseEntity<?> index(@PathVariable String city) {
		List<Restaurant> maybeRestaurants = restaurantRepo.findByCity(city);		
		return ResponseEntity.of(Optional.of(maybeRestaurants));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> show(@PathVariable Long id, @PathVariable String city) {
		Optional<Restaurant> maybeRestaurant = restaurantRepo.findByCityAndId(city, id);
		return ResponseEntity.of(maybeRestaurant);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Restaurant create(@PathVariable String city, @RequestBody @Valid Restaurant restaurant) {
		restaurant.setId(null);
		restaurant.setCity(city);
		return restaurantRepo.save(restaurant);
	}	
	
	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable Long id, @PathVariable String city, 
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
	public ResponseEntity<?> delete(@PathVariable Long id, @PathVariable String city) {		
		if (restaurantRepo.findByCityAndId(city, id).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		restaurantRepo.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
