package com.caronte.sharing.services;

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
	public Prenotazione addPrenotazione(Prenotazione prenotazione) {
		return this.repoPrenotazione.save(prenotazione);		
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
	public Prenotazione updatePrenotazione(Prenotazione prenotazione) {
		return this.repoPrenotazione.save(prenotazione);
	}

	@Override
	public void deletePrenotazione(int id) {
		this.repoPrenotazione.deleteById(id);		
	}

	
	
}