package bookmytrip.Repository;

import java.util.List;

import bookmytrip.Entity.*;

public interface HotelRepository extends EntryRepository<Hotel> {
	
	// TODO: implement a sorting functionality (according to different criteria - name, price level, rating etc.)
	
	List<Hotel> findByContactCityAndBreakfastInclOrderByName(City city, Boolean breakfastIncl);
	
	List<Hotel> findByContactCityAndStarsOrderByName(City city, Integer stars);	
}
