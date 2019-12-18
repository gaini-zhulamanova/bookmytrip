package bookmytrip.Repository;

import java.util.*;
import java.util.stream.Collectors;

import bookmytrip.Entity.*;

public interface RestaurantRepository extends EntryRepository<Restaurant> {
	
	// TODO: implement a sorting functionality (according to different criteria - name, price level, rating etc.)
	
	default List<Restaurant> findByContactCityAndCuisineOrderByName(City city, String cuisine) {
		return findByContactCity(city).stream()
				.filter(r -> r.getCuisines().stream()
						.anyMatch(c -> c.getType().equals(cuisine)))
				.sorted((r1, r2) -> r1.getName().compareTo(r2.getName()))
				.collect(Collectors.toList());
	}
	
	List<Restaurant> findByContactCityAndPriceLevelOrderByPriceLevel(City city, Integer priceLevel);
}