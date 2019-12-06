package bookmytrip.Entity;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonBackReference;


import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@PrimaryKeyJoinColumn(name = "restaurant_Id")
public class Restaurant extends Entry {
	
	@ManyToMany
	@JoinTable(name = "restaurant_to_cousine",
			joinColumns = @JoinColumn(name = "restaurant_id"),
			inverseJoinColumns = @JoinColumn(name = "cuisine_id"))
	@JsonBackReference
	private List<Cuisine> cuisines;
	
	// New property
	@NotNull
	@Min(1) @Max(3)
	@Column(nullable = false)
	private Integer priceLevel;
}
