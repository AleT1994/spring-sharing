package com.caronte.sharing.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="veicoli")
public class Veicolo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String nome;
	private String tipo;
	private String autonomia;
	private String posizioneAttuale;
	private String disponibile;
	private String vistaBanner;
	private String immagine;
	
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
	public String getAutonomia() {
		return autonomia;
	}
	public void setAutonomia(String autonomia) {
		this.autonomia = autonomia;
	}
	public String getPosizioneAttuale() {
		return posizioneAttuale;
	}
	public void setPosizioneAttuale(String posizioneAttuale) {
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
		builder.append(", autonomia=");
		builder.append(autonomia);
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
