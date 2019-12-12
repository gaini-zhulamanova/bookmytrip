package bookmytrip.Repository;

import java.util.List;

import bookmytrip.Entity.Hotel;

public interface HotelRepository extends EntryRepository<Hotel> {
	
	// TODO: implement a sorting functionality (according to different criteria - name, price level, rating etc.)
	// TODO: adapt City enum
	
	List<Hotel> findByCityAndBreakfastInclOrderByName(String city, Boolean breakfastIncl);
	
	List<Hotel> findByCityAndStarsOrderByName(String city, Integer stars);	
}
