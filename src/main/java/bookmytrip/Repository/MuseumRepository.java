package bookmytrip.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.jpa.repository.*;

import bookmytrip.Entity.Museum;

public interface MuseumRepository extends JpaRepository<Museum, Long> {
	
	default List<Museum> findByCity(String city) {
		return findAll().stream()
				.filter(m -> m.getCity().equals(city))
				.collect(Collectors.toList());
	}
	
	default Optional<Museum> findByCityAndId(String city, Long id) {
		return findByCity(city).stream()
				.filter(m -> m.getId().equals(id))
				.findFirst();
	}
}
