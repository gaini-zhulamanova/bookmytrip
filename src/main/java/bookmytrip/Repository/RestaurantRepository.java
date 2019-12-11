package bookmytrip.Repository;

import java.util.*;
import java.util.stream.Collectors;

import bookmytrip.Entity.Restaurant;

public interface RestaurantRepository extends EntryRepository<Restaurant> {
	
	// TODO: implement a sorting functionality (according to different criteria - name, price level, rating etc.)
	
//	default List<Restaurant> findByCity(String city) {
//		return findAll().stream()
//				.filter(r -> r.getCity().equals(city))
//				.sorted((r1, r2) -> r1.getName().compareTo(r2.getName()))
//				.collect(Collectors.toList());
//	}
//	
//	default Optional<Restaurant> findByCityAndId(String city, Long id) {
//		return findByCity(city).stream()
//				.filter(r -> r.getId().equals(id))
//				.findFirst();
//	}
//	
//	default Optional<List<Restaurant>> findByName(String city, String name) {
//		return Optional.of(findByCity(city).stream()
//				.filter(r -> 
//					r.getName().toLowerCase().contains(name.toLowerCase()) ||
//					name.toLowerCase().contains(r.getName().toLowerCase()) 
//				)
//				.sorted((r1, r2) -> calculateAvrgRating(r2).compareTo(calculateAvrgRating(r1))) // sorts by rating (from the best)
//				.collect(Collectors.toList()));	
//	}
	
	default List<Restaurant> findByCityAndCuisineOrderByName(String city, String cuisine) {
		return findByCity(city).stream()
				.filter(r -> r.getCuisines().stream()
						.anyMatch(c -> c.getType().equals(cuisine)))
				.sorted((r1, r2) -> r1.getName().compareTo(r2.getName())) // sort alphabetically
				.collect(Collectors.toList());
	}
	
	List<Restaurant> findByCityAndPriceLevelOrderByPriceLevel(String city, Integer priceLevel);
	
//	default List<Restaurant> filterByPriceLevel(String city, Integer priceLevel) {
//		return findByCity(city).stream()
//				.filter(r -> r.getPriceLevel().equals(priceLevel))
//				.sorted((r1, r2) -> r1.getName().compareTo(r2.getName())) // sort alphabetically
//				.collect(Collectors.toList());
//	}
	
//	default List<Restaurant> filterByRaitingPoints(String city, Integer avgRating) {
//		return findByCity(city).stream()
//				.filter(restaurant -> calculateAvrgRating(restaurant) >= avgRating) // separate method, changed == to >=
//				.sorted((r1, r2) -> r1.getName().compareTo(r2.getName())) // sort alphabetically
//				.collect(Collectors.toList());
//	}
//	
//	default Long calculateAvrgRating(Restaurant restaurant) {
//		return Math.round(restaurant.getReviews().stream()
//				.map(review -> review.getRating())
//				.mapToInt(rating -> rating)
//				.average().getAsDouble());
//	}
}
