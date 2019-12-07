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

	// TODO: create tests

	private final ReviewRepository reviewRepo;

	@GetMapping
	public List<Review> index(
			@PathVariable String city,
			@PathVariable String entries,
			@PathVariable Long entryId,
			@RequestParam(required = false) Integer rating) {
		
		return reviewRepo.findAllByCityAndEntryId(city, entries, entryId);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> show(
			@PathVariable String city,
			@PathVariable String entries,
			@PathVariable Long entryId,
			@PathVariable Long id) {
		
		Optional<Review> maybeReview = reviewRepo.findByIdLimited(city, entries, entryId, id);
		return ResponseEntity.of(maybeReview);
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
		
		review.setId(id);
		if (reviewRepo.findByIdLimited(city, entries, entryId, id).isEmpty()) {
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
		
		if (reviewRepo.findByIdLimited(city, entries, entryId, id).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		reviewRepo.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);		
	}
}
