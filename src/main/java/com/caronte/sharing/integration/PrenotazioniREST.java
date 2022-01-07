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

import com.caronte.sharing.entities.Prenotazione;
import com.caronte.sharing.entities.Veicolo;
import com.caronte.sharing.services.PrenotazioneService;
import com.caronte.sharing.services.VeicoloService;

@RestController
@RequestMapping("/api/prenotazioni")
public class PrenotazioniREST {
	
	@Autowired
	private PrenotazioneService prenotazioneService;
	
	@Autowired
	private VeicoloService veicoloService;
	
	@PostMapping
	public Prenotazione add(@RequestBody Prenotazione prenotazione) {
		Veicolo veicolo = veicoloService.getOne(prenotazione.getVeicoloId());
		veicolo.setDisponibile("false");
		veicoloService.updateVeicolo(veicolo);
		return prenotazioneService.addPrenotazione(prenotazione);
	}
	
	@GetMapping
	public List<Prenotazione> getPrenotazioni() {
		return prenotazioneService.getAll();
	}
	
	@GetMapping("/{id}")
	public Prenotazione getPrenotazioneById(@PathVariable ("id") int id) {
			return prenotazioneService.getOne(id);
	}
	
	@PutMapping
	public Prenotazione update(@RequestBody Prenotazione prenotazione) {
		return prenotazioneService.updatePrenotazione(prenotazione);
	}
	
	@DeleteMapping 
	public void delete(@PathVariable("id") int id) {
		prenotazioneService.deletePrenotazione(id);
	}
	
}
