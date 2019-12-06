package bookmytrip.Entity;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import lombok.*;

@Entity
@Getter
@Setter
public class Cuisine {
	
	@Id
	private String type;
	
	
	@ManyToMany(mappedBy = "cuisines", cascade = CascadeType.ALL)
	private List<Restaurant> restaurants;
}
