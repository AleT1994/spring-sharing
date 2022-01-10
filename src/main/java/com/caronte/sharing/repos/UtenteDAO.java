package com.caronte.sharing.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.caronte.sharing.entities.Utente;

@Repository
public interface UtenteDAO extends JpaRepository<Utente, Integer> {

	Utente findByEmail(String email);
	void deleteByEmail(String email);
	
}