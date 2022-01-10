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

import com.caronte.sharing.entities.GraficoVeicolo;
import com.caronte.sharing.entities.Veicolo;
import com.caronte.sharing.services.VeicoloService;


@RestController
@RequestMapping("/api/veicoli")
public class VeicoliREST {

	@Autowired
	private VeicoloService veicoloService;
	
	@PostMapping
	public void aggiungiVeicolo(@RequestBody Veicolo veicolo) {
		veicoloService.addVeicolo(veicolo);
	}
	
	@GetMapping("/id/{id}")
	public Veicolo getVeicolo(@PathVariable("id") int id) {
			return veicoloService.getOne(id);
	}

	@GetMapping
	public List<Veicolo> getVeicoli() {
		return veicoloService.getAll();
	}

	@GetMapping("/tipo/{tipo}")
	public List<Veicolo> getVeicoliByTipo(@PathVariable("tipo") String tipo) {
		return veicoloService.getByTipo(tipo);
	}
	
	@GetMapping("/tipo/somma")
	public List<GraficoVeicolo> sommaByTipo() {
		return veicoloService.sumTipo();
	}

	@GetMapping("/banner/{vistaBanner}")
	public List<Veicolo> getVeicoliByBanner(@PathVariable("vistaBanner") String vistaBanner) {
		return veicoloService.getByBanner(vistaBanner);
	}
	
	@GetMapping("/disponibile/{disponibile}")
	public List<Veicolo> getVeicoliByDisponibile(@PathVariable("disponibile") String disponibile) {
		return veicoloService.getByDisponibile(disponibile);
	}
	
	@PutMapping
	public void modificaVeicolo(@RequestBody Veicolo veicolo) {
		veicoloService.addVeicolo(veicolo);
	}
	
	@DeleteMapping("/id/{id}")
	public void eliminaVeicolo(@PathVariable("id") int id) {
		veicoloService.deleteVeicolo(id);
	}

}
