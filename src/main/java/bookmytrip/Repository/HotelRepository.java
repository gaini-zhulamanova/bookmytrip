package bookmytrip.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;

import bookmytrip.Entity.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
	
	@Query(value = "SELECT * FROM Hotel h JOIN Entry e ON h.hotel_id = e.id WHERE e.city = ?1",
			nativeQuery = true)
	List<Hotel> findAllByCity(String city);
}
