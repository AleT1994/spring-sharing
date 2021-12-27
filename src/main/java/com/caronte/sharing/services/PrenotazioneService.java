package com.caronte.sharing.services;

import java.util.List;

import com.caronte.sharing.entities.Prenotazione;

public interface PrenotazioneService {

	void addPrenotazione(Prenotazione prenotazione);
	Prenotazione getOne(int id);
	List<Prenotazione> getAll();
	Prenotazione updatePrenotazione(Prenotazione prenotazione);
	void deletePrenotazione(int id);
	
}
