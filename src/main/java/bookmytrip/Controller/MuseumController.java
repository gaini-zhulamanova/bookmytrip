package bookmytrip.Controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import bookmytrip.Entity.Museum;
import bookmytrip.Repository.MuseumRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book-my-trip/{city}/museums")
public class MuseumController {
	
	// TODO: create tests
	
	private final MuseumRepository museumRepo; // Changed the name to a shorter one
	
	@GetMapping
	public List<Museum> index(@PathVariable String city) {
		return museumRepo.findAll().stream()
				.filter(r -> r.getCity().equals(city))
				.collect(Collectors.toList());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		Optional<Museum> maybeMuseum = museumRepo.findById(id);
		return ResponseEntity.of(maybeMuseum);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Museum create(@PathVariable String city, @RequestBody @Valid Museum museum) {
		museum.setId(null);
		museum.setCity(city);
		return museumRepo.save(museum);
	}
	
	
	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable Long id, @RequestBody @Valid Museum museum, 
			@PathVariable String city) {
		museum.setId(id);
		museum.setCity(city);
		if (!museumRepo.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		museumRepo.save(museum);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {		
		if (!museumRepo.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		museumRepo.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
