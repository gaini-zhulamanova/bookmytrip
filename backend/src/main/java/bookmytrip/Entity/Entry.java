package bookmytrip.Entity;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.*;

@Entity
@Getter @Setter
@Inheritance(strategy = InheritanceType.JOINED)
public class Entry {
	
	// TODO: adapt City enum
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToMany(mappedBy = "entry")
	@JsonBackReference
	private List<Review> reviews;
	
	@NotBlank
	@Column(nullable = false)
	private String city;
	
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
