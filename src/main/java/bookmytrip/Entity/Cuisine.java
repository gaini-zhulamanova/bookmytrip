package bookmytrip.Entity;

import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.*;

@Entity
@Getter @Setter
public class Cuisine {
	
	@Id
	@NotBlank
	private String type;	

	@ManyToMany(mappedBy = "cuisines")
	@JsonBackReference
	private Set<Restaurant> restaurants;
}
