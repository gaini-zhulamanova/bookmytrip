package bookmytrip.Controller;

import java.util.*;
import java.util.stream.Collectors;

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
	
	
	//Auf dem Pfand Standard REST-Methoden
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
	
	
	//Auf dem Pfand nach Restaurant-Name suchen
	@GetMapping("/search")
	public ResponseEntity<?> showByName(@PathVariable String city, 
			@RequestParam(required = false) String name) {
		
		List<Restaurant> maybeRestaurants = restaurantRepo.findByCity(city).stream()
				.filter(r -> 
					r.getName().toLowerCase().contains(name.toLowerCase()) ||
					name.toLowerCase().contains(r.getName().toLowerCase()) 
				)
				.collect(Collectors.toList());
		
		
		return ResponseEntity.of(Optional.of(maybeRestaurants));
	}
	
	//Auf dem Pfand filtern nach 3 Kriterien
	@GetMapping("/filter")
	public ResponseEntity<?> showByFilter(@PathVariable String city, 
			@RequestParam(required = false) String cuisine, 
			@RequestParam(required = false) Integer price,
			@RequestParam(required = false) Integer rating) {
		
		List<Restaurant> maybeRestaurants = null;
		
		if (cuisine != null) {
			maybeRestaurants = restaurantRepo.filterByCuisine(city, cuisine);
		}
		
		if (maybeRestaurants != null && price != null) {
			maybeRestaurants.retainAll(restaurantRepo
					.filterByPriceLevel(city, price));
		} else if (maybeRestaurants == null && price != null) {
			maybeRestaurants = restaurantRepo
					.filterByPriceLevel(city, price);
		}
		
		if (maybeRestaurants != null && rating != null) {
			maybeRestaurants.retainAll(restaurantRepo
					.filterByRaitingPoints(city, rating));
		} else if (maybeRestaurants == null && rating != null) {
			maybeRestaurants = restaurantRepo
					.filterByRaitingPoints(city, rating);
		}
		
		return ResponseEntity.of(Optional.of(maybeRestaurants));
		
	}
	
	
	
}
