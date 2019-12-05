package bookmytrip.Entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Cuisine {
	
	@Id
	@NotBlank
	private String type;
	
//	@ManyToMany(mappedBy = "cuisines")
//	private List<Restaurant> restaurants;
}
