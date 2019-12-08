package bookmytrip.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.jpa.repository.JpaRepository;

import bookmytrip.Entity.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
	
	default List<Restaurant> findByCity(String city) {
		return findAll().stream()
				.filter(r -> r.getCity().equals(city))
				.sorted((r1, r2) -> r1.getName().compareTo(r2.getName()))
				.collect(Collectors.toList());
	}
	
	default Optional<Restaurant> findByCityAndId(String city, Long id) {
		return findByCity(city).stream()
				.filter(r -> r.getId().equals(id))
				.findFirst();
	}
	
	default List<Restaurant> filterByCuisine(String city, String cuisine) {
		return findByCity(city).stream()
				.filter(r -> r.getCuisines().stream()
						.anyMatch(c -> c.getType().equals(cuisine)))
				.collect(Collectors.toList());
	}
	
	default List<Restaurant> filterByPriceLevel(String city, Integer priceLevel) {
		return findByCity(city).stream()
				.filter(r -> r.getPriceLevel().equals(priceLevel))
				.collect(Collectors.toList());
	}
	
	default List<Restaurant> filterByRaitingPoints(String city, Integer avgRating) {
		return findByCity(city).stream()
				.filter(restaurant -> Math.round((double) restaurant.getReviews().stream()
						.map(review -> review.getRating())
						.mapToInt(rating -> rating)
						.average().getAsDouble()) == avgRating)
				.collect(Collectors.toList());
	}

}
