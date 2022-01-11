package com.caronte.sharing.entities;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.caronte.sharing.util.PosizioneJsonConverter;

@Entity
@Table(name="veicoli")
public class Veicolo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String nome;
	private String tipo;
	private String modello;
	private String capacita;
	private String potenza;
	private String velocitaMassima;
	private String autonomia;
	private String descrizione;

	

	@Convert(converter = PosizioneJsonConverter.class)
	private Posizione posizioneAttuale;
	
	private String disponibile;
	private String vistaBanner;
	private String immagine;
	
	

	
	
	public Veicolo() {
		super();
	}
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	public String getModello() {
		return modello;
	}
	public void setModello(String modello) {
		this.modello = modello;
	}
	public String getCapacita() {
		return capacita;
	}
	public void setCapacita(String capacita) {
		this.capacita = capacita;
	}
	public String getPotenza() {
		return potenza;
	}
	public void setPotenza(String potenza) {
		this.potenza = potenza;
	}
	public String getVelocitaMassima() {
		return velocitaMassima;
	}
	public void setVelocitaMassima(String velocitaMassima) {
		this.velocitaMassima = velocitaMassima;
	}
	public String getAutonomia() {
		return autonomia;
	}
	public void setAutonomia(String autonomia) {
		this.autonomia = autonomia;
	}
	public String getDescrizione() {
		return descrizione;
	}
	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
	}
	public Posizione getPosizioneAttuale() {
		return posizioneAttuale;
	}
	public void setPosizioneAttuale(Posizione posizioneAttuale) {
		this.posizioneAttuale = posizioneAttuale;
	}
	public String getDisponibile() {
		return disponibile;
	}
	public void setDisponibile(String disponibile) {
		this.disponibile = disponibile;
	}
	public String getVistaBanner() {
		return vistaBanner;
	}
	public void setVistaBanner(String vistaBanner) {
		this.vistaBanner = vistaBanner;
	}
	public String getImmagine() {
		return immagine;
	}
	public void setImmagine(String immagine) {
		this.immagine = immagine;
	}
	
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Veicolo [id=");
		builder.append(id);
		builder.append(", nome=");
		builder.append(nome);
		builder.append(", tipo=");
		builder.append(tipo);
		builder.append(", modello=");
		builder.append(modello);
		builder.append(", capacita=");
		builder.append(capacita);
		builder.append(", potenza=");
		builder.append(potenza);
		builder.append(", velocitaMassima=");
		builder.append(velocitaMassima);
		builder.append(", autonomia=");
		builder.append(autonomia);
		builder.append(", descrizione=");
		builder.append(descrizione);
		builder.append(", posizioneAttuale=");
		builder.append(posizioneAttuale);
		builder.append(", disponibile=");
		builder.append(disponibile);
		builder.append(", vistaBanner=");
		builder.append(vistaBanner);
		builder.append(", immagine=");
		builder.append(immagine);
		builder.append("]");
		return builder.toString();
	}
}
