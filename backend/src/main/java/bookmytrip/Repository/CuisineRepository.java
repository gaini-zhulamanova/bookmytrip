package backend.src.main.java.bookmytrip.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bookmytrip.Entity.Cuisine;

public interface CuisineRepository extends JpaRepository<Cuisine, String> {

}
