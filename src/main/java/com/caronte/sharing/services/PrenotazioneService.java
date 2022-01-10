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
	void updatePrenotazione(Prenotazione prenotazione);
	void updateFinePrenotazione(int id, LocalDateTime now);
	void deletePrenotazione(int id);
	
}
