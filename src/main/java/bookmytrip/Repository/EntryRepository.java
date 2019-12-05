package bookmytrip.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import bookmytrip.Entity.Entry;

public interface EntryRepository extends JpaRepository<Entry, Long>{
	
	Optional<List<Entry>> findByCity(String city);
}
