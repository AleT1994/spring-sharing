package com.caronte.sharing.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.caronte.sharing.entities.Prenotazione;

public interface PrenotazioneDAO extends JpaRepository<Prenotazione, Integer> {

	List<Prenotazione> findByUtenteEmail(String utenteEmail);
	List<Prenotazione> findByVeicoloId(int veicoloId);
	
}