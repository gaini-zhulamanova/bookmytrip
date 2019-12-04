package bookmytrip.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bookmytrip.Entity.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

}
