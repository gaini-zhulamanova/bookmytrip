package bookmytrip.Entity;

import javax.persistence.*;
import javax.validation.constraints.*;

import lombok.*;

@Entity
@Getter @Setter
@PrimaryKeyJoinColumn(name = "museum_id")
public class Museum extends Entry{
	
	@NotNull
	@Column(nullable = false)
	private String type;
	
	@NotNull
	@Min(1) @Max(3)
	@Column(nullable = false)
	private Integer priceLevel;		
}
