package com.caronte.sharing.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.caronte.sharing.entities.Utente;

public interface UtenteService {

	void addUtente(Utente utente);
	Utente getOne(String email);
	List<Utente> getAll();
	void updateUtente(Utente utente);
	void addImageUtente(MultipartFile multipartFile);
	void deleteUtente(String email);
	
}
