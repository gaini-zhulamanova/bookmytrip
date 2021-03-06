package bookmytrip.Controller;

import java.util.*;
import java.util.stream.*;

import org.springframework.web.bind.annotation.*;

import bookmytrip.Entity.*;
import bookmytrip.Repository.EntryRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book-my-trip")
public class EntryController {	
	
	private final EntryRepository<Entry> entryRepository;
	
	@GetMapping
	public List<String> showAllCities() {		
		return Stream.of(City.values())
				.map(City::getTitle)
				.collect(Collectors.toList());
	}
	
	@GetMapping("/{city}")
	public List<Entry> showEntriesByCity(@PathVariable String city) {		
		City enumCity = City.convertToEnum(city);
		return entryRepository.findByContactCity(enumCity);
	}	
}
