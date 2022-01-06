package com.caronte.sharing.entities;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name="prenotazioni")
public class Prenotazione {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id; 
	private String utenteEmail;
	private int veicoloId; 
	private String tipo;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	private LocalDateTime InizioPrenotazione;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	private LocalDateTime FinePrenotazione;
	
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
		return InizioPrenotazione;
	}
	public void setInizioPrenotazione(LocalDateTime inizioPrenotazione) {
		InizioPrenotazione = inizioPrenotazione;
	}
	public LocalDateTime getFinePrenotazione() {
		return FinePrenotazione;
	}
	public void setFinePrenotazione(LocalDateTime finePrenotazione) {
		FinePrenotazione = finePrenotazione;
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
		builder.append(InizioPrenotazione);
		builder.append(", FinePrenotazione=");
		builder.append(FinePrenotazione);
		builder.append("]");
		return builder.toString();
	}
	
}
	