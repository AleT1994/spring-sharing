package com.caronte.sharing.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.caronte.sharing.entities.GraficoVeicolo;
import com.caronte.sharing.entities.Veicolo;
import com.caronte.sharing.repos.VeicoloDAO;

import java.io.IOException;
import org.springframework.util.StringUtils;


import com.caronte.sharing.config.CustomProperties;
import com.caronte.sharing.util.FileUploader;


@Service
public class VeicoloServiceImpl implements VeicoloService {

	@Autowired
	private VeicoloDAO repoVeicoli;

	@Override
	public Veicolo saveVeicolo(Veicolo veicolo) {
		return this.repoVeicoli.save(veicolo);
	}
	
	@Override
	public Veicolo saveVeicolo(Veicolo veicolo, MultipartFile multipartFile) {
		 // 1) nome del file o immagine
		 // 2) setto nome del file prima di salvare il veicolo
		 // 3) salvo il veicolo
		 // 4) genero il percorso della cartella dove salvare l'immagine
		 // 5) classe utility con metodo statico che salva il file
		 // 6) restituisco il veicolo salvato
		
		//1
		String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
		
		//3
		Veicolo veicoloSalvato = repoVeicoli.save(veicolo);

		//4
		String uploadDir = CustomProperties.basepath + "/" + veicoloSalvato.getTipo();
		 
       try {
       	//5
			FileUploader.saveFile(uploadDir, fileName, multipartFile);
		} catch (IOException e) {
			e.printStackTrace();
		}
       

       //6
		return veicoloSalvato;
	}

	@Override
	public Veicolo getOne(int id) {
		return this.repoVeicoli.findById(id).get();
	}

	@Override
	public List<Veicolo> getAll() {
		return this.repoVeicoli.findAll();
	}

	@Override
	public List<Veicolo> getByTipo(String tipo) {
		return this.repoVeicoli.findByTipo(tipo);
	}
	
	@Override
	public List<Veicolo> getByBanner(String banner) {
		return this.repoVeicoli.findByVistaBanner(banner);
	}

	@Override
	public List<Veicolo> getByDisponibile(String disponibile) {
		return this.repoVeicoli.findByDisponibile(disponibile);
	}
	
	@Override
	public List<GraficoVeicolo> sumTipo() {

		List<Map<String, Integer>> respDB = this.repoVeicoli.sumTipoGroupByTipo();
		List<GraficoVeicolo> toReturn = new ArrayList<GraficoVeicolo>();
		respDB.forEach((map) -> {
			GraficoVeicolo graficoVeicolo = new GraficoVeicolo();
			graficoVeicolo.setTipoVeicolo(String.valueOf(map.get("tipoVeicolo")));
			graficoVeicolo.setSommaTipo(Integer.valueOf(String.valueOf(map.get("sommaTipo"))));
			toReturn.add(graficoVeicolo);
		});

		return toReturn;
	}

	@Override
	public void updateVeicolo(Veicolo veicolo) {
		this.repoVeicoli.save(veicolo);
	}

	@Override
	public void deleteVeicolo(int id) {
		this.repoVeicoli.deleteById(id);
	}

}
