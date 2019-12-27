package bookmytrip.Entity;

import java.util.ArrayList;
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
	
	@OneToMany(mappedBy = "entry", cascade = CascadeType.ALL)
	@JsonBackReference
	private List<Review> reviews = new ArrayList<Review>();
	
	@NotBlank
	@Column(nullable = false)
	private String name;
	
	@Embedded
	private Contact contact;
	
	@NotNull
	@Column(nullable = false)
	private Long avrgRating = (long) 0;
	
	@NotNull
	@Column(nullable = false)
	private Integer numOfReviews = 0;
	
}
