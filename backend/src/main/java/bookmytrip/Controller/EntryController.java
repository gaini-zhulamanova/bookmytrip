package backend.src.main.java.bookmytrip.Controller;

import java.util.*;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import bookmytrip.Entity.Entry;
import bookmytrip.Repository.EntryRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book-my-trip")
@CrossOrigin("http://localhost:4205")
public class EntryController {	
	
	private final EntryRepository entryRepository;
	
//	@GetMapping
//	public List<Entry> index() {		
//		return entryRepository.findAll();
//	}
	
	@GetMapping("/{city}")
	public ResponseEntity<?> showEntriesByCity(@PathVariable String city) {
		
		Optional<List<Entry>> maybeCity = entryRepository.findByCity(city);
		return ResponseEntity.of(maybeCity);
	}
}
