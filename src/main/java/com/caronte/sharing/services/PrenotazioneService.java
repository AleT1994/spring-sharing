package com.caronte.sharing.services;

import java.time.LocalDateTime;
import java.util.List;

import com.caronte.sharing.entities.Prenotazione;

public interface PrenotazioneService {

	void addPrenotazione(Prenotazione prenotazione);
	Prenotazione getOne(int id);
	List<Prenotazione> getAll();
	List<Prenotazione> getByUtenteEmail(String utenteEmail);
	List<Prenotazione> getByVeicoloId(int veicoloId);
	List<Prenotazione> getByStato(String stato);
	void closePrenotazione(Prenotazione prenotazione);
	void updatePrenotazioneData(Prenotazione prenotazione);
	void deletePrenotazione(int id);
	
}
