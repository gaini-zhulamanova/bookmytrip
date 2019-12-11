package bookmytrip.Controller;

import java.util.*;

import javax.validation.Valid;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import bookmytrip.Entity.Museum;
import bookmytrip.Entity.Museum;
import bookmytrip.Repository.MuseumRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book-my-trip/{city}/museums")
public class MuseumController {
	
	// TODO: create tests
	
	private final MuseumRepository museumRepo;
	
	@GetMapping
	public ResponseEntity<?> index(@PathVariable String city) {
		
		var maybeMuseums = Optional.of(museumRepo
				.findByCity(city));		
		return ResponseEntity.of(maybeMuseums);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> show(
			@PathVariable Long id,
			@PathVariable String city) {
		
		var maybeMuseums = Optional.of(museumRepo
				.findByCityAndId(city, id));
		return ResponseEntity.of(maybeMuseums);
	}
	
	@GetMapping("/filter")
	public ResponseEntity<?> showByFilter(
			@PathVariable String city, 
			@RequestParam(required = false) String type, 
			@RequestParam(required = false) Integer priceLevel,
			@RequestParam(required = false) Integer rating) {
		
		List<Museum> maybeMuseums = null;
		
		// TODO: filter by several cuisines (for instance, Italian + German)
		
		if (type != null) {
			maybeMuseums = museumRepo.findByCityAndTypeOrderByName(city, type);
		}
		
		// TODO: filter by several price levels (for instance, cheap + medium)
		
		if (maybeMuseums != null && priceLevel != null) {
			maybeMuseums.retainAll(museumRepo
					.findByCityAndPriceLevelOrderByPriceLevel(city, priceLevel));
		} else if (priceLevel != null) { // maybeMuseums == null is unnecessary
			maybeMuseums = museumRepo
					.findByCityAndPriceLevelOrderByPriceLevel(city, priceLevel);
		}
		
		if (maybeMuseums != null && rating != null) {
			maybeMuseums.retainAll(museumRepo
					.findByCityAndRatingOrderByName(city, rating));
		} else if (rating != null) { // maybeMuseums == null is unnecessary
			maybeMuseums = museumRepo
					.findByCityAndRatingOrderByName(city, rating);
		}
		
		return ResponseEntity.of(Optional.of(maybeMuseums));		
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Museum create(
			@PathVariable String city,
			@RequestBody @Valid Museum museum) {
		
		museum.setId(null);
		museum.setCity(city);
		return museumRepo.save(museum);
	}	
	
	@PutMapping("/{id}")
	public ResponseEntity<?> update(
			@PathVariable Long id,
			@RequestBody @Valid Museum museum, 
			@PathVariable String city) {
		
		museum.setId(id);
		museum.setCity(city);
		if (museumRepo.findByCityAndId(city, id).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		museumRepo.save(museum);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(
			@PathVariable Long id,
			@PathVariable String city) {	
		
		if (museumRepo.findByCityAndId(city, id).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		museumRepo.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
