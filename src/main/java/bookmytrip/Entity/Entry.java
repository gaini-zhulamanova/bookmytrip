package bookmytrip.Entity;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sun.istack.NotNull;

import lombok.*;

@Entity
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)
public class Entry {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;
	
	@OneToMany(mappedBy = "entry")
	@JsonBackReference
	private List<Review> reviews;
	
	@NotBlank
	@NotNull
	@Column(nullable = false)
	public String city;
	
	@NotBlank
	@NotNull
	@Column(nullable = false)
	public String name;

//	@NotBlank
//	private String phoneNumber;
//
//	// TODO: NotNull we do later
//	@NotBlank
//	private String address;
}
