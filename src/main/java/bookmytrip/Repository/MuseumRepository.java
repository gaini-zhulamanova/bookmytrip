package bookmytrip.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bookmytrip.Entity.Museum;

public interface MuseumRepository extends JpaRepository<Museum, Long> {

}
