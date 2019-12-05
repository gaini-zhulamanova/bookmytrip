package bookmytrip.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import bookmytrip.Entity.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

	@Query(value = "SELECT * FROM Restaurant r JOIN Entry e ON r.restaurant_id = e.id WHERE e.city = ?1",
			nativeQuery = true)
	List<Restaurant> findAllByCity(String city);

}
