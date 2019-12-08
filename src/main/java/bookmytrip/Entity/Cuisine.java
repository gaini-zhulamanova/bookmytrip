package bookmytrip.Entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
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
	
	@ManyToMany(mappedBy = "cousines")
	@JoinTable(
		name = "restaurant_to_cousine",
		joinColumns = @JoinColumn(name = "cuisine_id"),
		inverseJoinColumns = @JoinColumn(name = "restaurant_id"))
	private List<Restaurant> restaurants;
}
