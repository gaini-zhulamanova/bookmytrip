package bookmytrip.Controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import bookmytrip.Entity.Review;
import bookmytrip.Repository.ReviewRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book-my-trip/{city}/{entries}/{entry_id}/reviews")
public class ReviewController {
	
	// TODO: create tests

	private final ReviewRepository reviewRepo;
	
	@GetMapping
	public List<Review> index(@PathVariable String city, @PathVariable String entries, @PathVariable Long entry_id) {
		switch (entries) {
			case "restaurants":
				return reviewRepo.findAllByRestaurantId(city, entry_id);
			case "hotels":
				return reviewRepo.findAllByHotelId(city, entry_id);
			case "museums":
				return reviewRepo.findAllByMuseumId(city, entry_id);
			default:
				return null;
		}		
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		Optional<Review> maybeReview = reviewRepo.findById(id);
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
		review.setId(null);		
		if (!reviewRepo.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		reviewRepo.save(review);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {		
		if (!reviewRepo.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		reviewRepo.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
