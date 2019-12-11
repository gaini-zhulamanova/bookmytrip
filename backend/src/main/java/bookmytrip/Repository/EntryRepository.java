package backend.src.main.java.bookmytrip.Repository;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

import bookmytrip.Entity.Entry;

public interface EntryRepository extends JpaRepository<Entry, Long>{
	
	Optional<List<Entry>> findByCity(String city);
}
