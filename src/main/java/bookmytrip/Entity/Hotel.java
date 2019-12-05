package bookmytrip.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@PrimaryKeyJoinColumn(name = "hotel_Id")
public class Hotel extends Entry {
	
	// New property
	@NotNull
	@Min(1) @Max(5)
	
	@Column(nullable = false)
	private Integer stars;
	
	// Rooms might not be a good idea since we would need to create a separate entity for them (like with cuisine) and create a ManyToMany relationship
	// However in our case with limited database and filtering criteria it won't make much sense since usually a hotel has all kinds of rooms
	// --> filtering results won't change much
	// So maybe it's better to have, for example, boolean breakfastIncl --> it's a much clearer distinction and doesn't have to be an entity
	
	@NotNull
	@Column(nullable = false)
	private Boolean breakfastIncl;
	

}
