package bookmytrip.Repository;

import java.util.*;
import java.util.stream.Collectors;

import bookmytrip.Entity.Restaurant;

public interface RestaurantRepository extends EntryRepository<Restaurant> {
	
	// TODO: implement a sorting functionality (according to different criteria - name, price level, rating etc.)
	// TODO: adapt City enum
	
	default List<Restaurant> findByCityAndCuisineOrderByName(String city, String cuisine) {
		return findByCity(city).stream()
				.filter(r -> r.getCuisines().stream()
						.anyMatch(c -> c.getType().equals(cuisine)))
				.sorted((r1, r2) -> r1.getName().compareTo(r2.getName()))
				.collect(Collectors.toList());
	}
	
	List<Restaurant> findByCityAndPriceLevelOrderByPriceLevel(String city, Integer priceLevel);
}