package bookmytrip.Repository;

import java.util.List;

import bookmytrip.Entity.Museum;

public interface MuseumRepository extends EntryRepository<Museum> {
	
	// TODO: implement a sorting functionality (according to different criteria - name, price level, rating etc.)
	// TODO: adapt City enum
	
	List<Museum> findByCityAndPriceLevelOrderByPriceLevel(String city, Integer priceLevel);
	
	List<Museum> findByCityAndTypeOrderByName(String city, String type);
}
