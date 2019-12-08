package bookmytrip.Entity;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.*;

@Entity
@Getter
@Setter
public class Cuisine {
	
	@Id
	private String type;
	
	@ManyToMany(mappedBy = "cuisines", cascade = CascadeType.ALL)
	@JsonBackReference
	private List<Restaurant> restaurants;
}
