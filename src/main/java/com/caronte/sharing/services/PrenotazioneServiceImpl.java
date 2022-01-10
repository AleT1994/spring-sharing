package com.caronte.sharing.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.caronte.sharing.entities.Prenotazione;
import com.caronte.sharing.repos.PrenotazioneDAO;

@Service
public class PrenotazioneServiceImpl implements PrenotazioneService {

	@Autowired
	private PrenotazioneDAO repoPrenotazione;

	@Override
	public void addPrenotazione(Prenotazione prenotazione) {
		prenotazione.setTipo("standard");
		prenotazione.setStato("in corso");

		this.repoPrenotazione.save(prenotazione);
	}

	@Override
	public Prenotazione getOne(int id) {
		return this.repoPrenotazione.findById(id).get();
	}

	@Override
	public List<Prenotazione> getAll() {
		return this.repoPrenotazione.findAll();
	}

	@Override
	public List<Prenotazione> getByUtenteEmail(String utenteEmail) {
		return this.repoPrenotazione.findByUtenteEmail(utenteEmail);
	}

	@Override
	public List<Prenotazione> getByVeicoloId(int veicoloId) {
		return this.repoPrenotazione.findByVeicoloId(veicoloId);
	}

	@Override
	public void updatePrenotazione(Prenotazione prenotazione) {
		LocalDateTime now = LocalDateTime.now();  
		prenotazione.setFinePrenotazione(now);
		prenotazione.setStato("conclusa");

		this.repoPrenotazione.save(prenotazione);
	}

	@Override
	public void updateFinePrenotazione(int id, LocalDateTime finePrenotazione) {


	}

	@Override
	public void deletePrenotazione(int id) {
		this.repoPrenotazione.deleteById(id);
	}

}