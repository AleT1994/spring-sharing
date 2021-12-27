package com.caronte.sharing.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.caronte.sharing.entities.Utente;

public interface UtenteDAO extends JpaRepository<Utente, Integer> {
	Utente findByEmail(String email);
	void deleteByEmail(String email);
}