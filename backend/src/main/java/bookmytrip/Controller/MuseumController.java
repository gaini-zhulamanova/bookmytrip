package bookmytrip.Controller;

import java.util.*;

import javax.validation.Valid;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import bookmytrip.Entity.*;
import bookmytrip.Repository.MuseumRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book-my-trip/{city}/museums")
@CrossOrigin("http://localhost:4200")
public class MuseumController {
	
	// TODO: create tests
	
	private final MuseumRepository museumRepo;
	
	@GetMapping
	public List<Museum> index(@PathVariable String city) {
		
		City enumCity = City.convertToEnum(city);
		return museumRepo.findByCity(enumCity);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> showById(
			@PathVariable Long id,
			@PathVariable String city) {
		
		City enumCity = City.convertToEnum(city);
		var maybeMuseums = Optional.of(museumRepo
				.findByCityAndId(enumCity, id));
		return ResponseEntity.of(maybeMuseums);
	}
	
	@GetMapping("/search")
	public List<Museum> showByName(
			@PathVariable String city, 
			@RequestParam(required = false) String name) {
		
		City enumCity = City.convertToEnum(city);
		return museumRepo.findByCityAndNameOrderByRating(enumCity, name);
	}
	
	@GetMapping("/filter")
	public List<Museum> showByFilter(
			@PathVariable String city, 
			@RequestParam(required = false) String type, 
			@RequestParam(required = false) Integer priceLevel,
			@RequestParam(required = false) Integer rating) {
		
		List<Museum> maybeMuseums = null;
		City enumCity = City.convertToEnum(city);
		// TODO: filter by several types (for instance, historical + contemporary)
		
		if (type != null) {
			maybeMuseums = museumRepo.findByCityAndTypeOrderByName(enumCity, type);
		}
		
		// TODO: filter by several price levels (for instance, cheap + medium)
		
		if (maybeMuseums != null && priceLevel != null) {
			maybeMuseums.retainAll(museumRepo
					.findByCityAndPriceLevelOrderByPriceLevel(enumCity,priceLevel));
		} else if (priceLevel != null) {
			maybeMuseums = museumRepo
					.findByCityAndPriceLevelOrderByPriceLevel(enumCity, priceLevel);
		}
		
		if (maybeMuseums != null && rating != null) {
			maybeMuseums.retainAll(museumRepo
					.findByCityAndRatingOrderByName(enumCity, rating));
		} else if (rating != null) {
			maybeMuseums = museumRepo
					.findByCityAndRatingOrderByName(enumCity, rating);
		}
		
		return maybeMuseums;		
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Museum create(
			@PathVariable String city,
			@RequestBody @Valid Museum museum) {
		
		City enumCity = City.convertToEnum(city);
		museum.setId(null);
		museum.setCity(enumCity);
		return museumRepo.save(museum);
	}	
	
	@PutMapping("/{id}")
	public ResponseEntity<?> update(
			@PathVariable Long id,
			@RequestBody @Valid Museum museum, 
			@PathVariable String city) {
		
		City enumCity = City.convertToEnum(city);
		museum.setId(id);
		museum.setCity(enumCity);
		if (museumRepo.findByCityAndId(enumCity, id).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		museumRepo.save(museum);
		return new ResponseEntity<>(museumRepo.findAll(),HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(
			@PathVariable Long id,
			@PathVariable String city) {	
		
		City enumCity = City.convertToEnum(city);
		if (museumRepo.findByCityAndId(enumCity, id).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		museumRepo.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
