package bookmytrip.Repository;

import java.util.List;

import bookmytrip.Entity.*;

public interface HotelRepository extends EntryRepository<Hotel> {
	
	// TODO: implement a sorting functionality (according to different criteria - name, price level, rating etc.)
	// TODO: adapt City enum
	
	List<Hotel> findByCityAndBreakfastInclOrderByName(City city, Boolean breakfastIncl);
	
	List<Hotel> findByCityAndStarsOrderByName(City city, Integer stars);	
}
