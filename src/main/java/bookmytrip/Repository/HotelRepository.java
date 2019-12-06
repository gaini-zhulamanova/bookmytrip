package bookmytrip.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.jpa.repository.*;

import bookmytrip.Entity.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
	
	default List<Hotel> findByCity(String city) {
		return findAll().stream()
				.filter(h -> h.getCity().equals(city))
				.collect(Collectors.toList());
	}
	
	default Optional<Hotel> findByCityAndId(String city, Long id) {
		return findByCity(city).stream()
				.filter(h -> h.getId().equals(id))
				.findFirst();
	}
}
