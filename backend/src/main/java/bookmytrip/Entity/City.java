package bookmytrip.Entity;

public enum City {
	
	FRANKFURT, BERLIN, KÖLN, HAMBURG, LEIPZIG, DÜSSSELDORF, MAINZ, STUTTGART, MÜNCHEN, BONN;
	
	public static City convertToEnum(String str) {
		return City.valueOf(str.toUpperCase());
	}
}
