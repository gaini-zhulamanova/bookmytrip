package bookmytrip.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bookmytrip.Entity.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long> {

}
