package bookmytrip.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bookmytrip.Entity.Entry;

public interface EntryRepository extends JpaRepository<Entry, Long>{
	
	// TODO: do we need this Repository at all?
}
