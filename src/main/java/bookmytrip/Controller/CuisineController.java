package bookmytrip.Controller;

import java.util.*;

import javax.validation.Valid;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import bookmytrip.Entity.Cuisine;
import bookmytrip.Repository.CuisineRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cuisines")
public class CuisineController {
	
	// TODO: create tests
	
	private final CuisineRepository cuisineRepo;

	@GetMapping
	public List<Cuisine> index(){
		return cuisineRepo.findAll();
	}

	@GetMapping("/{cuisine}")
	public ResponseEntity<?> show(@PathVariable String cuisine) {
		Optional<Cuisine> maybeEntry = cuisineRepo.findById(cuisine);
		return ResponseEntity.of(maybeEntry);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Cuisine create(@RequestBody @Valid Cuisine cuisine) {
		return cuisineRepo.save(cuisine);
	}

	// TODO: do we need a PutMapping for Cuisine at all? We won't need to update anything since it has only one attribute 'type'

//	@PutMapping("/{cuisine}")
//	public ResponseEntity<?> update(@PathVariable String cuisine, @RequestBody @Valid Cuisine cuisine) {
//		cuisine.setId(null);
//
//		if (!cuisineRepo.existsById(cuisine)) {
//			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//		}
//
//		cuisineRepo.save(cuisine);
//		return new ResponseEntity<>(HttpStatus.OK);
//	}

	@DeleteMapping("/{cuisine}")
	public ResponseEntity<?> delete(@PathVariable String cuisine) {
		if (!cuisineRepo.existsById(cuisine)) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		cuisineRepo.deleteById(cuisine);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}	
}
