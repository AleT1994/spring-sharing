package com.caronte.sharing.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.caronte.sharing.entities.Prenotazione;

public interface PrenotazioneDAO extends JpaRepository<Prenotazione, Integer> {

}