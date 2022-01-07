package com.caronte.sharing.entities;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

@Entity
@Table(name="prenotazioni")
public class Prenotazione {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id; 
	private String utenteEmail;
	private int veicoloId; 
	private String tipo;
	
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	private LocalDateTime inizioPrenotazione;
	
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	private LocalDateTime finePrenotazione;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUtenteEmail() {
		return utenteEmail;
	}
	public void setUtenteEmail(String utenteEmail) {
		this.utenteEmail = utenteEmail;
	}
	public int getVeicoloId() {
		return veicoloId;
	}
	public void setVeicoloId(int veicoloId) {
		this.veicoloId = veicoloId;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	public LocalDateTime getInizioPrenotazione() {
		return inizioPrenotazione;
	}
	public void setInizioPrenotazione(LocalDateTime inizioPrenotazione) {
		this.inizioPrenotazione = inizioPrenotazione;
	}
	public LocalDateTime getFinePrenotazione() {
		return finePrenotazione;
	}
	public void setFinePrenotazione(LocalDateTime finePrenotazione) {
		this.finePrenotazione = finePrenotazione;
	}
	
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Prenotazione [id=");
		builder.append(id);
		builder.append(", utenteEmail=");
		builder.append(utenteEmail);
		builder.append(", veicoloId=");
		builder.append(veicoloId);
		builder.append(", tipo=");
		builder.append(tipo);
		builder.append(", InizioPrenotazione=");
		builder.append(inizioPrenotazione);
		builder.append(", FinePrenotazione=");
		builder.append(finePrenotazione);
		builder.append("]");
		return builder.toString();
	}
	
}
	