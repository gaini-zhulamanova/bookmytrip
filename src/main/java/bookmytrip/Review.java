package bookmytrip;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.Range;

import com.sun.istack.NotNull;	

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Review {
	
	@Length(max = 500)
	private String comment;
	
	@ManyToOne
	@JoinColumn(name = "entry_id", nullable = false)
	private Entry entry;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	@Range(min = 1L, max = 5L)
	private Integer reviewPoints;
	
}

 
