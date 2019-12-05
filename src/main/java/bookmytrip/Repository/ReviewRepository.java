package bookmytrip.Repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import bookmytrip.Entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>{
	
	@Query(value = "SELECT * FROM Restaurant rest JOIN Entry e ON rest.restaurant_id = e.id JOIN Review r ON r.entry_id = e.id "
			+ "WHERE e.city = ?1 AND rest.restaurant_id = ?2",
			nativeQuery = true)
	List<Review> findAllByRestaurantId(String city, Long id);
	
	@Query(value = "SELECT * FROM Hotel h JOIN Entry e ON h.hotel_id = e.id JOIN Review r ON r.entry_id = e.id "
			+ "WHERE e.city = ?1 AND h.hotel_id = ?2",
			nativeQuery = true)
	List<Review> findAllByHotelId(String city, Long id);
	
	@Query(value = "SELECT * FROM Museum m JOIN Entry e ON m.museum_id = e.id JOIN Review r ON r.entry_id = e.id "
			+ "WHERE e.city = ?1 AND m.museum_id = ?2",
			nativeQuery = true)
	List<Review> findAllByMuseumId(String city, Long id);
}
