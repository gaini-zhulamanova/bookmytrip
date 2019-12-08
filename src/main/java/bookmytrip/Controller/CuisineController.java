package bookmytrip.Controller;

import javax.validation.Valid;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import bookmytrip.Entity.Cuisine;
import bookmytrip.Repository.CuisineRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book-my-trip/cuisines")
public class CuisineController {
	
	// TODO: create tests
	
	private final CuisineRepository cuisineRepo;

//	@GetMapping
//	public List<Cuisine> index(){
//		return cuisineRepo.findAll();
//	}
//
//	@GetMapping("/{type}")
//	public ResponseEntity<?> show(@PathVariable String type) {
//		Optional<Cuisine> maybeEntry = cuisineRepo.findById(type);
//		return ResponseEntity.of(maybeEntry);
//	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Cuisine create(@RequestBody @Valid Cuisine cuisine) {
		
		return cuisineRepo.save(cuisine);
	}

	@DeleteMapping("/{type}")
	public ResponseEntity<?> delete(@PathVariable String type) {
		
		if (!cuisineRepo.existsById(type)) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		cuisineRepo.deleteById(type);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}	
}
