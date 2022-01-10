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
	public void addUtente(Utente utente) {
		utente.setRuolo("utente");
		this.repoUtente.save(utente);
	}

	@Override
	public Utente getOne(String email) {
		return this.repoUtente.findByEmail(email);
	}

	@Override
	public List<Utente> getAll() {
		return this.repoUtente.findAll();
	}

	@Override
	public void updateUtente(Utente utente) {
		this.repoUtente.save(utente);
	}

	@Override
	public void deleteUtente(String email) {
		this.repoUtente.deleteByEmail(email);
	}

}
