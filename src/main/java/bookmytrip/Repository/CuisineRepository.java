package bookmytrip.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.jpa.repository.JpaRepository;

import bookmytrip.Entity.Cuisine;
import bookmytrip.Entity.Restaurant;

public interface CuisineRepository extends JpaRepository<Cuisine, String> {

	default List<Cuisine> findByType(String type){
		return findAll().stream()
				.filter(c -> c.getType().equals(type))
				.collect(Collectors.toList());
	}
	
	default Optional<Cuisine> findByRestaurants(List<Restaurant> restaurants, String type){
		return findByType(type).stream()
				.filter(c -> c.getRestaurants().equals(restaurants))
				.findAny();
	}
	
	
	
}
