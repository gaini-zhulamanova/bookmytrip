package bookmytrip.Entity;

import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.*;

@Entity
@Getter @Setter
public class MuseumType {
	
	@Id
	@NotBlank
	private String type;	

	@ManyToMany(
			mappedBy = "types",
			cascade = CascadeType.ALL)
	@JsonBackReference
	private Set<Museum> museums;

}
