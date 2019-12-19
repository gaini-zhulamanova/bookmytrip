package bookmytrip.Repository;

import java.util.List;
import java.util.stream.Collectors;

import bookmytrip.Entity.*;

public interface MuseumRepository extends EntryRepository<Museum> {
	
	// TODO: implement a sorting functionality (according to different criteria - name, price level, rating etc.)
	
	List<Museum> findByContactCityAndPriceLevelOrderByPriceLevel(City city, Integer priceLevel);
	
	default List<Museum> findByContactCityAndTypeOrderByName(City city, String type) {
		return findByContactCity(city).stream()
				.filter(m -> m.getTypes().stream()
						.anyMatch(t -> t.getType().equals(type)))
				.sorted((m1, m2) -> m1.getName().compareTo(m2.getName()))
				.collect(Collectors.toList());
	}
}
