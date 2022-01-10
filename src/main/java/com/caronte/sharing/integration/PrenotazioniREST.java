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
	public void aggiungiPrenotazione(@RequestBody Prenotazione prenotazione) {
		Veicolo veicolo = veicoloService.getOne(prenotazione.getVeicoloId());
		veicolo.setDisponibile("false");
		veicoloService.updateVeicolo(veicolo);

		prenotazioneService.addPrenotazione(prenotazione);
	}
	
	@GetMapping
	public List<Prenotazione> getPrenotazioni() {
		return prenotazioneService.getAll();
	}
	
	@GetMapping("id/{id}")
	public Prenotazione getPrenotazione(@PathVariable ("id") int id) {
			return prenotazioneService.getOne(id);
	}
	
	@GetMapping("email/{utenteEmail}")
	public List<Prenotazione> getPrenotazioneByUtenteEmail(@PathVariable ("utenteEmail") String utenteEmail) {
			return prenotazioneService.getByUtenteEmail(utenteEmail);
	}
	
	@GetMapping("veicolo/{veicoloId}")
	public List<Prenotazione> getPrenotazioneByVeicoloId(@PathVariable ("veicoloId") int veicoloId) {
			return prenotazioneService.getByVeicoloId(veicoloId);
	}
	
	@PutMapping
	public void modificaPrenotazione(@RequestBody Prenotazione prenotazione) {
		prenotazioneService.updatePrenotazione(prenotazione);
	}
	
	@DeleteMapping ("id/{id}")
	public void eliminaPrenotazione(@PathVariable("id") int id) {
		prenotazioneService.deletePrenotazione(id);
	}
	
}
