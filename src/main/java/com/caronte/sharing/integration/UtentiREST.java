package com.caronte.sharing.integration;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.caronte.sharing.entities.Utente;
import com.caronte.sharing.services.UtenteService;

@RestController
@RequestMapping("/api/utenti")
public class UtentiREST {
	
	@Autowired
	private UtenteService utenteService;
	
	@PostMapping
	public void aggiungiUtente(@RequestBody Utente utente) {
		utenteService.addUtente(utente);
	}
	
	@GetMapping
	public List<Utente> getUtenti() {
		return utenteService.getAll();
	}
	
	@GetMapping("/email/{email}")
	public Utente getUtenteByEmail(@PathVariable("email") String email) {
			return utenteService.getOne(email);
	}
	
	@PutMapping
	public void modificaUtente(@RequestBody Utente utente) {
		utenteService.updateUtente(utente);
	}
	
	@DeleteMapping("email/{email}")
	public void eliminaUtente(@PathVariable("email") String email) {
		utenteService.deleteUtente(email);
	}
	
}
