package bookmytrip.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bookmytrip.Entity.MuseumType;

public interface MuseumTypeRepository extends JpaRepository<MuseumType, String> {

}
