package com.caronte.sharing.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.caronte.sharing.entities.Utente;
import com.caronte.sharing.repos.UtenteDAO;

@Service
public class UtenteServiceImpl implements UtenteService {

	@Autowired
	private UtenteDAO repoUtente;
	
	@Override
	public Utente addUtente(Utente utente) {
		utente.setRuolo("utente");
		return this.repoUtente.save(utente);
	}

	@Override
	public Utente getByEmail(String email) {
		return this.repoUtente.findByEmail(email);
	}

	@Override
	public List<Utente> getAll() {
		return this.repoUtente.findAll();
	}

	@Override
	public Utente updateUtente(Utente utente) {
		return this.repoUtente.save(utente);
	}

	@Override
	public void deleteUtente(String email) {
		this.repoUtente.deleteByEmail(email);
	}

}
