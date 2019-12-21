package bookmytrip.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.*;

import bookmytrip.Repository.CuisineRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book-my-trip/cuisines")
public class CuisineController {
	
	private final CuisineRepository cuisineRepo;
	
	@GetMapping
	public List<String> showAllCities() {
		
		return cuisineRepo.findAll().stream()
				.map(c -> c.getType())
				.collect(Collectors.toList());
	}

}
