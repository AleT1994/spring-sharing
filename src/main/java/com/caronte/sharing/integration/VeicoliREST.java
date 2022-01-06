package com.caronte.sharing.integration;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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
	public void add(@RequestBody Veicolo veicolo) {
		veicoloService.addVeicolo(veicolo);
	}
	
	@GetMapping
	public List<Veicolo> getVeicoli() {
		return veicoloService.getAll();
	}
	
	@GetMapping("/tipo/{tipo}")
	public List<Veicolo> getVeicoliByTipo(@PathVariable("tipo") String tipo) {
		return veicoloService.getByTipo(tipo);
	}
	
	@GetMapping("/banner/{vistaBanner}")
	public List<Veicolo> getVeicoliByBanner(@PathVariable("vistaBanner") String vistaBanner) {
		return veicoloService.getByBanner(vistaBanner);
	}
	
	@GetMapping("/disponibile/{disponibile}")
	public List<Veicolo> getVeicoliDisponibilita(@PathVariable("disponibile") String disponibile) {
		return veicoloService.getByDisponibilita(disponibile);
	}
	
	@GetMapping("/tipo/somma")
	public List<GraficoVeicolo> sumOfTipo() {
		return veicoloService.sumTipo();
	}
	
	@GetMapping("/id/{id}")
	public Veicolo getVeicoloById(@PathVariable("id") int id) {
			return veicoloService.getOne(id);
	}
	
	@PutMapping
	public Veicolo update(@RequestBody Veicolo veicolo) {
		return veicoloService.updateVeicolo(veicolo);
	}
	
	@DeleteMapping("/id/{id}")
	public void delete(@PathVariable("id") int id) {
		veicoloService.deleteVeicolo(id);
	}

}
