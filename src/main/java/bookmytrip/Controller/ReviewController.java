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
	public List<Review> index(@PathVariable String city, @PathVariable String entries,
			@PathVariable Long entryId) {		
		return reviewRepo.findAllByCityAndEntryId(city, entries, entryId);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> show(@PathVariable String city, @PathVariable String entries,
			@PathVariable Long entryId, @PathVariable Long id) {
		Optional<Review> maybeReview = reviewRepo.findAllByCityAndEntryId(city, entries, entryId)
				.stream().filter(r -> r.getId().equals(id))
				.findFirst();
		return ResponseEntity.of(maybeReview);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Review create(@RequestBody @Valid Review review) {
		review.setId(null);
		return reviewRepo.save(review);
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Review review) {
		review.setId(id);
		if (!reviewRepo.existsById(id)) {
			return new ResponseEntity<>(review, HttpStatus.NOT_FOUND);
		}
		reviewRepo.save(review);
		return new ResponseEntity<>(review, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable String city, @PathVariable String entries,
			@PathVariable Long entryId, @PathVariable Long id) {	
		
		boolean existsById = reviewRepo.findAllByCityAndEntryId(city, entries, entryId)
				.stream().anyMatch(r -> r.getId().equals(id));
		
		if (existsById) {
			reviewRepo.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
