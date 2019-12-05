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
	
	private final RestaurantRepository restaurantRepo;
	
	@GetMapping
	public List<Restaurant> index(@PathVariable String city) {
		return restaurantRepo.findAllByCity(city);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		Optional<Restaurant> maybeRestaurant = restaurantRepo.findById(id);
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
		if (!restaurantRepo.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		restaurantRepo.save(restaurant);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {		
		if (!restaurantRepo.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		restaurantRepo.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
