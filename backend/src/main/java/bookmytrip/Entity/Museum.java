package bookmytrip.Entity;

import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.*;

import lombok.*;

@Entity
@Getter @Setter
@PrimaryKeyJoinColumn(name = "museum_id")
public class Museum extends Entry {
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(
			name = "museum_to_type",
			joinColumns = @JoinColumn(name = "museum_id"),
			inverseJoinColumns = @JoinColumn(name = "type_id"))
	private Set<MuseumType> types;
	
	@NotNull
	@Min(1) @Max(3)
	@Column(nullable = false)
	private Integer priceLevel;		
}
