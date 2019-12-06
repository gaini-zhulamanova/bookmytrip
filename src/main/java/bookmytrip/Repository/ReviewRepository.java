package bookmytrip.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.jpa.repository.JpaRepository;

import bookmytrip.Entity.*;

public interface ReviewRepository extends JpaRepository<Review, Long> {
	
	default List<Review> findAllByCityAndEntryId(String city, String entries, Long entryId) {		
		Class<?> entryType = defineEntryType(entries);
		
		if (entryType == null) {
			return null;
		}
		return findAll().stream()
				.filter(r -> r.getEntry().getCity().equals(city))
				.filter(r -> r.getEntry().getClass().isInstance(entryType))
				.filter(r -> r.getEntry().getId().equals(entryId))
				.collect(Collectors.toList());				
	}
	
	default Class<?> defineEntryType(String entries) {		
		switch (entries) {
			case "restaurants":
				return Restaurant.class;
			case "hotels":
				return Hotel.class;
			case "museums":
				return Museum.class;
			default:
				return null;
		}		
	}
		
	default Optional<Review> findByIdLimited(String city, String entries, Long entryId, Long id) {
		return findAllByCityAndEntryId(city, entries, entryId)
				.stream().filter(r -> r.getId().equals(id))
				.findFirst();
	}
	
//	@Query(value = "SELECT * FROM Restaurant rest "
//			+ "JOIN Entry e ON rest.restaurant_id = e.id "
//			+ "JOIN Review r ON r.entry_id = e.id "
//			+ "WHERE e.city = ?1 AND rest.restaurant_id = ?2",
//			nativeQuery = true)
//	List<Review> findAllByRestaurantId(String city, Long id);
//	
//	@Query(value = "SELECT * FROM Hotel h "
//			+ "JOIN Entry e ON h.hotel_id = e.id "
//			+ "JOIN Review r ON r.entry_id = e.id "
//			+ "WHERE e.city = ?1 AND h.hotel_id = ?2",
//			nativeQuery = true)
//	List<Review> findAllByHotelId(String city, Long id);
//	
//	@Query(value = "SELECT * FROM Museum m "
//			+ "JOIN Entry e ON m.museum_id = e.id "
//			+ "JOIN Review r ON r.entry_id = e.id "
//			+ "WHERE e.city = ?1 AND m.museum_id = ?2",
//			nativeQuery = true)
//	List<Review> findAllByMuseumId(String city, Long id);
	
}
