package bookmytrip.Repository;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.data.jpa.repository.JpaRepository;

import bookmytrip.Entity.*;

public interface ReviewRepository extends JpaRepository<Review, Long> {
	
	default List<Review> findAllByContactCityAndEntryId(City city, String entries, Long entryId) {			
		return findAll().stream()
				.filter(r -> r.getEntry().getContact().getCity().equals(city))
				.filter(r -> entryTypeMatches(entries, r))
				.filter(r -> r.getEntry().getId().equals(entryId))
				.sorted((r1, r2) -> r2.getId().compareTo(r1.getId()))
				.collect(Collectors.toList());				
	}
	
	default boolean entryTypeMatches(String entries, Review review) {
			switch (entries) {
				case "restaurants":
					return review.getEntry() instanceof Restaurant;
				case "hotels":
					return review.getEntry() instanceof Hotel;
				case "museen":
					return review.getEntry() instanceof Museum;
				default:
					return false;
			}
	}
	
	default List<Review> filterByRating(City city, String entries, Long entryId, Integer rating) {
		return findAllByContactCityAndEntryId(city, entries, entryId).stream()
				.filter(r -> r.getRating() >= rating)
				.sorted((r1, r2) -> r2.getId().compareTo(r1.getId()))
				.collect(Collectors.toList());
	}
		
	default Optional<Review> findByIdLimited(City city, String entries, Long entryId, Long id) {
		return findAllByContactCityAndEntryId(city, entries, entryId).stream()
				.filter(r -> r.getId().equals(id))
				.findFirst();
	}	
}
