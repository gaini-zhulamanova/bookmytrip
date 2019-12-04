package bookmytrip.Entity;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@PrimaryKeyJoinColumn(name = "museum_id")
public class Museum extends Entry{

	// TODO: add properties (Controller and Repository are already done)
}
