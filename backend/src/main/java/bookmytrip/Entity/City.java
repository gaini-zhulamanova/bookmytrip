package bookmytrip.Entity;

public enum City {
	
	FRANKFURT("Frankfurt"), 
	BERLIN("Berlin"), 
	KÖLN("Köln"), 
	HAMBURG("Hamburg"), 
	LEIPZIG("Leipzig"), 
	DÜSSSELDORF("Düsseldorf"), 
	MAINZ("Mainz"), 
	STUTTGART("Stuttgart"), 
	MÜNCHEN("München"), 
	BONN("Bonn");
	
	String title;
	
	City(String title) {
		this.title = title;
	}
	
	public String getTitle() {
		return title;
	}

	public static City convertToEnum(String str) {
		return City.valueOf(str.toUpperCase());
	}
}
