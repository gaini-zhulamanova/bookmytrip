package bookmytrip.Controller;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import bookmytrip.Entity.*;
import bookmytrip.Repository.EntryRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book-my-trip")
@CrossOrigin("http://localhost:4200")
public class EntryController {	
	
	private final EntryRepository<Entry> entryRepository;
	
	@GetMapping
	public List<String> showAllCities() {
		return Stream.of(City.values())
				.map(City::getTitle)
				.collect(Collectors.toList());
	}
	
	@GetMapping("/{city}")
	public ResponseEntity<?> showEntriesByCity(@PathVariable String city) {
		
		City enumCity = City.convertToEnum(city);
		List<Entry> maybeCity = entryRepository
				.findByCity(enumCity);
		return ResponseEntity.of(Optional.of(maybeCity));
	}	
}