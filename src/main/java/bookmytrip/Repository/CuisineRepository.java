package bookmytrip.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import bookmytrip.Entity.Cuisine;
import bookmytrip.Entity.Restaurant;

public interface CuisineRepository extends JpaRepository<Cuisine, String> {

	
	
}
