package bookmytrip.Entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sun.istack.NotNull;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)
public class Entry {
	
	@OneToMany(mappedBy = "entry")
	@JsonBackReference
	private List<Review> reviews;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank
	@NotNull
	@Column(nullable = false)
	private String city;
	
	@NotBlank
	@NotNull
	@Column(nullable = false)
	private String name;

	// New property
	// TODO: Should we allow it to be null?
	@NotBlank
	private String phoneNumber;
	
	// New property
	// TODO: Should we allow it to be null?
	@NotBlank
	private String address;
}
