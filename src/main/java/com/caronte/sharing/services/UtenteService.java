package com.caronte.sharing.services;

import java.util.List;

import com.caronte.sharing.entities.Utente;

public interface UtenteService {

	void addUtente(Utente utente);
	Utente getByEmail(String email);
	List<Utente> getAll();
	Utente updateUtente(Utente utente);
	void deleteUtente(String email);
	
}
