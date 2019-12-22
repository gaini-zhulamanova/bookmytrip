package bookmytrip.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.*;

import bookmytrip.Repository.MuseumTypeRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book-my-trip/museum-types")
public class MuseumTypeController {

	private final MuseumTypeRepository museumTypeRepo;
	
	@GetMapping
	public List<String> showAllMuseumTypes() {
		
		return museumTypeRepo.findAll().stream()
				.map(m -> m.getType())
				.collect(Collectors.toList());
	}
}
