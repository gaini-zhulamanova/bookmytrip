package bookmytrip.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

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
	@Min(1) @Max(5) // Changed the @Range Annotation (long type consumes more memory)
	@Column(nullable = false)
	private Integer rating; // Changed the reviewPoints name
	
}

 
