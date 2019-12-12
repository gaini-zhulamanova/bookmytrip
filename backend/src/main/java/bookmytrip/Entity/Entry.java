package bookmytrip.Entity;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.*;

@Entity
@Getter @Setter
@Inheritance(strategy = InheritanceType.JOINED)
public class Entry {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToMany(mappedBy = "entry")
	@JsonBackReference
	private List<Review> reviews;
	
	@NotNull
	@Column(nullable = false)
	private City city;
	
	@NotBlank
	@Column(nullable = false)
	private String name;

//	@NotBlank
//	private String phoneNumber;
//
//	// TODO: NotNull we do later
//	@NotBlank
//	private String address;
}
