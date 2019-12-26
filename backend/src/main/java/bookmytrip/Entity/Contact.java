package bookmytrip.Entity;

import javax.persistence.*;
import javax.validation.constraints.*;

import lombok.*;

@Getter @Setter
@Embeddable
public class Contact {
	
	@NotBlank
	private String phoneNumber;
	
	@NotBlank
	@NotNull
	@Column(nullable = false)
	private String address;
	
	@Enumerated(EnumType.STRING)
	@NotNull
	@Column(nullable = false)
	private City city;
}
