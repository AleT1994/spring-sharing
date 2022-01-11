package com.caronte.sharing.integration;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
	
	@GetMapping("/{email}")
	public Utente getUtenteByEmail(@PathVariable("email") String email) {
			return utenteService.getOne(email);
	}
	
	@PutMapping
	public void modificaUtente(@RequestBody Utente utente) {
		utenteService.updateUtente(utente);
	}
	
	@PostMapping("/foto")
	public void caricaImmagine(@RequestParam("image") MultipartFile file) {
		if (file == null || file.isEmpty()){}
		
		else {utenteService.addImageUtente(file);}
	}
	
	@Transactional
	@DeleteMapping("/{email}")
	public void eliminaUtente(@PathVariable("email") String email) {
		utenteService.deleteUtente(email);
	}
	
}
