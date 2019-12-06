package bookmytrip.Entity;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonBackReference;


import lombok.*;

@Entity
@Getter
@Setter
@PrimaryKeyJoinColumn(name = "restaurant_id")
public class Restaurant extends Entry {
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "restaurant_to_cuisine",
			joinColumns = @JoinColumn(name = "restaurant_id"),
			inverseJoinColumns = @JoinColumn(name = "cuisine_id"))
	//@JsonBackReference
	private List<Cuisine> cuisines;
	
	@NotNull
	@Min(1) @Max(3)
	@Column(nullable = false)
	private Integer priceLevel;	
}
