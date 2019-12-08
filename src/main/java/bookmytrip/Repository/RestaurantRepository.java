package bookmytrip.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.jpa.repository.JpaRepository;

import bookmytrip.Entity.Cuisine;
import bookmytrip.Entity.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

	
	default List<Restaurant> findByCity(String city) {
		return findAll().stream()
				.filter(r -> r.getCity().equals(city))
				.collect(Collectors.toList());
	}
	
	default Optional<Restaurant> findByCityAndId(String city, Long id) {
		return findByCity(city).stream()
				.filter(r -> r.getId().equals(id))
				.findFirst();
	}
	
	default Optional<Restaurant> findByCuisines(String city, List<Cuisine> cuisines){
		return findByCity(city).stream()
				.filter(r -> r.getCuisines().equals(cuisines))
				.findAny();

	}
}
	

