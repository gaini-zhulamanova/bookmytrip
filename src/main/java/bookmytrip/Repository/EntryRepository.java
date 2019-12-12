package bookmytrip.Repository;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.data.jpa.repository.JpaRepository;

import bookmytrip.Entity.Entry;

public interface EntryRepository<T extends Entry> extends JpaRepository<T, Long> {
	
	// TODO: implement a sorting functionality (according to different criteria - name, price level, rating etc.)
	// TODO: adapt City enum
	
	List<T> findByCity(String city);
	
	List<T> findByCityOrderByName(String city);
	
	List<T> findByCityAndId(String city, Long id);
	
	default List<T> findByCityAndNameOrderByRating(String city, String name) {
		return findByCity(city).stream()
				.filter(r -> 
					r.getName().toLowerCase().contains(name.toLowerCase()) ||
					name.toLowerCase().contains(r.getName().toLowerCase()) 
				)
				.sorted((r1, r2) -> (int) (calculateAvrgRating(r2) - calculateAvrgRating(r1)))
				.collect(Collectors.toList());	
	}
	
	default List<T> findByCityAndRatingOrderByName(String city, Integer avgRating) {
		return findByCity(city).stream()
				.filter(restaurant -> calculateAvrgRating(restaurant) >= avgRating)
				.sorted((r1, r2) -> r1.getName().compareTo(r2.getName()))
				.collect(Collectors.toList());
	}
	
	default Long calculateAvrgRating(T entry) {
		return Math.round(entry.getReviews().stream()
				.map(review -> review.getRating())
				.mapToInt(rating -> rating)
				.average().orElse(0));
	}
}
