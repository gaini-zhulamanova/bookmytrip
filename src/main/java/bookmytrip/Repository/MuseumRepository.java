package bookmytrip.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;

import bookmytrip.Entity.Museum;

public interface MuseumRepository extends JpaRepository<Museum, Long> {
	
	@Query(value = "SELECT * FROM Museum m JOIN Entry e ON m.museum_id = e.id WHERE e.city = ?1",
			nativeQuery = true)
	List<Museum> findAllByCity(String city);
}
