package bookmytrip.Repository;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.data.jpa.repository.JpaRepository;

import bookmytrip.Entity.*;

public interface EntryRepository<T extends Entry> extends JpaRepository<T, Long> {
	
	// TODO: implement a sorting functionality (according to different criteria - name, price level, rating etc.)
	
	List<T> findByCity(City city);
	
	List<T> findByCityOrderByName(City city);
	
	List<T> findByCityAndId(City enumCity, Long id);
	
	default List<T> findByCityAndNameOrderByRating(City city, String name) {
		return findByCity(city).stream()
				.filter(r -> 
					r.getName().toLowerCase().contains(name.toLowerCase()) ||
					name.toLowerCase().contains(r.getName().toLowerCase()) 
				)
				.sorted((r1, r2) -> calculateAvrgRating(r2).compareTo(calculateAvrgRating(r1)))
				.collect(Collectors.toList());	
	}
	
	default List<T> findByCityAndRatingOrderByName(City city, Integer avgRating) {
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
