package com.caronte.sharing.entities;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name="utenti")
public class Utente {

	@Id
	private String email; 
	private String password;
	private String ruolo; 
	private String nome; 
	private String cognome;

	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate nascita;
	
	private String patente;
	private String fotoProfilo;
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRuolo() {
		return ruolo;
	}
	public void setRuolo(String ruolo) {
		this.ruolo = ruolo;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getCognome() {
		return cognome;
	}
	public void setCognome(String cognome) {
		this.cognome = cognome;
	}
	public LocalDate getNascita() {
		return nascita;
	}
	public void setNascita(LocalDate nascita) {
		this.nascita = nascita;
	}
	public String getPatente() {
		return patente;
	}
	public void setPatente(String patente) {
		this.patente = patente;
	}
	public String getFotoProfilo() {
		return fotoProfilo;
	}
	public void setFotoProfilo(String fotoProfilo) {
		this.fotoProfilo = fotoProfilo;
	}
	
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Utente [email=");
		builder.append(email);
		builder.append(", password=");
		builder.append(password);
		builder.append(", ruolo=");
		builder.append(ruolo);
		builder.append(", nome=");
		builder.append(nome);
		builder.append(", cognome=");
		builder.append(cognome);
		builder.append(", nascita=");
		builder.append(nascita);
		builder.append(", patente=");
		builder.append(patente);
		builder.append(", fotoProfilo=");
		builder.append(fotoProfilo);
		builder.append("]");
		return builder.toString();
	}
	
}

