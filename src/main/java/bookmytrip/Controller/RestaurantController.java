package bookmytrip.Controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import bookmytrip.Entity.Cuisine;
import bookmytrip.Entity.Restaurant;
import bookmytrip.Repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/restaurants")
public class RestaurantController {
	
	// TODO: create tests
	
	private final RestaurantRepository restaurantRepo; // Changed the name to a shorter one
	
	@GetMapping
	public List<Restaurant> index() {
		return restaurantRepo.findAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		Optional<Restaurant> maybeRestaurant = restaurantRepo.findById(id);
		return ResponseEntity.of(maybeRestaurant);
	}
	
//	@GetMapping("/{id}/cuisines")
//	public ResponseEntity<?> showRestaurantsByCousine(@PathVariable Long id, @PathVariable String city, @PathVariable List<Cuisine> cuisines){
//		Optional<Restaurant> maybeRestByCousine = restaurantRepo.findByCuisines(cuisines);
//		return ResponseEntity.of(maybeRestByCousine);
//	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Restaurant create(@RequestBody @Valid Restaurant restaurant) {
		restaurant.setId(null);
		return restaurantRepo.save(restaurant);
	}	
	
	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable Long id, @RequestBody @Valid Restaurant restaurant) {
		restaurant.setId(null);		
		if (!restaurantRepo.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		restaurantRepo.save(restaurant);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	


//	@PutMapping(value = "/{id}/cuisines")
//	public ResponseEntity<?> updateCuisine(@PathVariable Long id, @PathVariable String city, 
//			@RequestBody @Valid Restaurant restaurant) {
////		HttpHeaders requestHeaders = new HttpHeaders();
////		requestHeaders.setContentType(MediaType.parseMediaType("text/uri-list"));
//		restaurant.setId(id);
//		restaurant.setCity(city);
////		System.out.println("Hallo");
//		if (restaurantRepo.findByCityAndId(city, id).isEmpty()) {
//			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//		}
//		//restaurant.getCuisines().add(cuisine);
//		restaurantRepo.save(restaurant);
//		return new ResponseEntity<>(HttpStatus.OK);
//	}
	

	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {		
		if (!restaurantRepo.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		restaurantRepo.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
