package bookmytrip.Controller;

import java.util.*;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import bookmytrip.Entity.*;
import bookmytrip.Repository.EntryRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book-my-trip")
public class EntryController {	
	
	private final EntryRepository<Entry> entryRepository;
	
	@GetMapping("/{city}")
	public ResponseEntity<?> showEntriesByCity(@PathVariable String city) {
		
		City enumCity = City.convertToEnum(city);
		List<Entry> maybeCity = entryRepository
				.findByCity(enumCity);
		return ResponseEntity.of(Optional.of(maybeCity));
	}
}
