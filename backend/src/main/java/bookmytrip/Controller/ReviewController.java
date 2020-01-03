package bookmytrip.Controller;

import java.util.*;

import javax.validation.Valid;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import bookmytrip.Entity.*;
import bookmytrip.Repository.ReviewRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book-my-trip/{city}/{entries}/{entryId}/reviews")
public class ReviewController {

	private final ReviewRepository reviewRepo;

	@GetMapping
	public List<Review> index(
			@PathVariable String city,
			@PathVariable String entries,
			@PathVariable Long entryId,
			@RequestParam(required = false) Integer rating) {

		City enumCity = City.convertToEnum(city);
		
		if (rating != null) {
			return reviewRepo.filterByRating(enumCity, entries, entryId, rating);
		} else {
			return reviewRepo.findAllByContactCityAndEntryId(enumCity, entries, entryId);
		}	
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> showById(
			@PathVariable String city,
			@PathVariable String entries,
			@PathVariable Long entryId,
			@PathVariable Long id) {
		
		City enumCity = City.convertToEnum(city);
		return ResponseEntity.of(reviewRepo
				.findByIdLimited(enumCity, entries, entryId, id));
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Review create(@RequestBody @Valid Review review) {
		
		review.setId(null);
		return reviewRepo.save(review);		
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> update(
			@PathVariable String city,
			@PathVariable String entries,
			@PathVariable Long entryId,
			@PathVariable Long id,
			@RequestBody Review review) {
		
		City enumCity = City.convertToEnum(city);
		review.setId(id);
		if (reviewRepo
				.findByIdLimited(enumCity, entries, entryId, id)
				.isEmpty()) {
			return new ResponseEntity<>(review, HttpStatus.NOT_FOUND);
		}
		reviewRepo.save(review);
		return new ResponseEntity<>(review, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(
			@PathVariable String city,
			@PathVariable String entries,
			@PathVariable Long entryId,
			@PathVariable Long id) {	
		
		City enumCity = City.convertToEnum(city);
		if (reviewRepo
				.findByIdLimited(enumCity, entries, entryId, id)
				.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		reviewRepo.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);		
	}
}
