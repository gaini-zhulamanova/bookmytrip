package bookmytrip.Repository;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.data.jpa.repository.JpaRepository;

import bookmytrip.Entity.Entry;

public interface EntryRepository<T extends Entry> extends JpaRepository<T, Long> {
	
	// TODO: implement a sorting functionality (according to different criteria - name, price level, rating etc.)
	
	List<T> findByCity(String city);
	
	List<T> findByCityOrderByName(String city);
	
//	default List<T> findByCity(String city) {
//		return findAll().stream()
//				.filter(r -> r.getCity().equals(city))
//				.sorted((r1, r2) -> r1.getName().compareTo(r2.getName()))
//				.collect(Collectors.toList());
//	}
	
	List<T> findByCityAndId(String city, Long id);
	
//	default Optional<T> findByCityAndId(String city, Long id) {
//		return findByCity(city).stream()
//				.filter(r -> r.getId().equals(id))
//				.findFirst();
//	}
	
	default List<T> findByCityAndNameOrderByRating(String city, String name) {
		return findByCity(city).stream()
				.filter(r -> 
					r.getName().toLowerCase().contains(name.toLowerCase()) ||
					name.toLowerCase().contains(r.getName().toLowerCase()) 
				)
				.sorted((r1, r2) -> calculateAvrgRating(r2).compareTo(calculateAvrgRating(r1))) // sorts by rating (from the best)
				.collect(Collectors.toList());	
	}
	
	default List<T> findByCityAndRatingOrderByName(String city, Integer avgRating) {
		return findByCity(city).stream()
				.filter(restaurant -> calculateAvrgRating(restaurant) >= avgRating) // separate method, changed == to >=
				.sorted((r1, r2) -> r1.getName().compareTo(r2.getName())) // sort alphabetically
				.collect(Collectors.toList());
	}
	
	default Long calculateAvrgRating(T entry) {
		return Math.round(entry.getReviews().stream()
				.map(review -> review.getRating())
				.mapToInt(rating -> rating)
				.average().getAsDouble());
	}
}
