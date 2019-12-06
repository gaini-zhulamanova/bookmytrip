package bookmytrip.Entity;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.hibernate.validator.constraints.Length;

import com.sun.istack.NotNull;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Review {
	
	@NotBlank
	@Length(max = 500)
	private String comment;
	
	@ManyToOne
	@JoinColumn(name = "entry_id", nullable = false)
	private Entry entry;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	@Min(1) @Max(5)
	@Column(nullable = false)
	private Integer rating;
	
}

 
