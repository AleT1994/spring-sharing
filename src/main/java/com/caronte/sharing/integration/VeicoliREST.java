package com.caronte.sharing.integration;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
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

import com.caronte.sharing.entities.GraficoVeicolo;
import com.caronte.sharing.entities.Posizione;
import com.caronte.sharing.entities.Veicolo;
import com.caronte.sharing.services.VeicoloService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/veicoli")
public class VeicoliREST {

	@Autowired
	private VeicoloService veicoloService;

	@PostMapping
	public ResponseEntity<Veicolo> uploadVeicolo(Veicolo veicolo, BindingResult result, HttpServletRequest request,
			@RequestParam("image") MultipartFile file) {

		Veicolo veicoloSalvato = new Veicolo();
		veicolo.setPosizioneAttuale(extractPosizione(request));

		if (file == null || file.isEmpty()) {
			veicoloSalvato = veicoloService.saveVeicolo(veicolo);

		} else {
			veicoloSalvato = veicoloService.saveVeicolo(veicolo, file);
		}

		return ResponseEntity.ok().body(veicoloSalvato);
	}

	private Posizione extractPosizione(HttpServletRequest request) {
		String posizione = request.getParameterValues("posizioneAttuale")[0];
		ObjectMapper mapper = new ObjectMapper();
		Posizione pos = null;
		try {
			pos = mapper.readValue(posizione, Posizione.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return pos;
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

	@PutMapping("/file")
	public ResponseEntity<Veicolo> modificaVeicolo(Veicolo veicolo, BindingResult result, HttpServletRequest request,
			@RequestParam("image") MultipartFile file) {
		veicoloService.updateVeicolo(veicolo);

		Veicolo veicoloSalvato = new Veicolo();
		veicolo.setPosizioneAttuale(extractPosizione(request));
		veicoloSalvato = veicoloService.updateVeicolo(veicolo,file);
		
		return ResponseEntity.ok().body(veicoloSalvato);
	}

	@PutMapping()
	public ResponseEntity<Veicolo> modificaVeicolo(Veicolo veicolo, BindingResult result, HttpServletRequest request) {
		veicoloService.updateVeicolo(veicolo);

		Veicolo veicoloSalvato = new Veicolo();
		veicolo.setPosizioneAttuale(extractPosizione(request));

		veicoloSalvato = veicoloService.updateVeicolo(veicolo);

		return ResponseEntity.ok().body(veicoloSalvato);
	}

	@DeleteMapping("/id/{id}")
	public void eliminaVeicolo(@PathVariable("id") int id) {
		veicoloService.deleteVeicolo(id);
	}

}
