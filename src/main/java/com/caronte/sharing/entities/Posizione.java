package com.caronte.sharing.entities;

public class Posizione {

	private String descrizione;
	private double latitudine;
	private double longitudine;
	
	public String getDescrizione() {
		return descrizione;
	}
	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
	}
	public double getLatitudine() {
		return latitudine;
	}
	public void setLatitudine(double latitudine) {
		this.latitudine = latitudine;
	}
	public double getLongitudine() {
		return longitudine;
	}
	public void setLongitudine(double longitudine) {
		this.longitudine = longitudine;
	}
	
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Posizione [descrizione=");
		builder.append(descrizione);
		builder.append(", latitudine=");
		builder.append(latitudine);
		builder.append(", longitudine=");
		builder.append(longitudine);
		builder.append("]");
		return builder.toString();
	}
}
