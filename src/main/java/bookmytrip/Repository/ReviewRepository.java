package bookmytrip.Repository;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.data.jpa.repository.JpaRepository;

import bookmytrip.Entity.*;

public interface ReviewRepository extends JpaRepository<Review, Long> {
	
	default List<Review> findAllByCityAndEntryId(String city, String entries, Long entryId) {			
		return findAll().stream()
				.filter(r -> r.getEntry().getCity().equals(city))
				.filter(r -> entryTypeMatches(entries, r))
				.filter(r -> r.getEntry().getId().equals(entryId)) // why do we cast?
				.sorted((r1, r2) -> r2.getId().compareTo(r1.getId())) // sort by ID (from the most recent)
				.collect(Collectors.toList());				
	}
	
	default boolean entryTypeMatches(String entries, Review review) {
			switch (entries) {
			case "restaurants":
				return review.getEntry() instanceof Restaurant;
			case "hotels":
				return review.getEntry() instanceof Hotel;
			case "museums":
				return review.getEntry() instanceof Museum;
			default:
				return false;
			}
	}
	
	default List<Review> filterByRating(String city, String entries, Long entryId, Integer rating) {
		return findAllByCityAndEntryId(city, entries, entryId).stream()
				.filter(r -> r.getRating() >= rating)
				.sorted((r1, r2) -> r2.getId().compareTo(r1.getId())) // sort by ID (from the most recent)
				.collect(Collectors.toList());
	}
		
	default Optional<Review> findByIdLimited(String city, String entries, Long entryId, Long id) {
		return findAllByCityAndEntryId(city, entries, entryId)
				.stream().filter(r -> r.getId().equals(id))
				.findFirst();
	}	
}
