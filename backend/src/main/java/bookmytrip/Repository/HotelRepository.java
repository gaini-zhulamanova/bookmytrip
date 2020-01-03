package bookmytrip.Repository;

import java.util.List;

import bookmytrip.Entity.*;

public interface HotelRepository extends EntryRepository<Hotel> {	
	
	List<Hotel> findByContactCityAndBreakfastInclOrderByName(City city, Boolean breakfastIncl);
	
	List<Hotel> findByContactCityAndStarsOrderByName(City city, Integer stars);	
}
