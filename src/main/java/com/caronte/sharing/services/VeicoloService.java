package com.caronte.sharing.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.caronte.sharing.entities.GraficoVeicolo;
import com.caronte.sharing.entities.Veicolo;

public interface VeicoloService {

	Veicolo saveVeicolo(Veicolo veicolo, MultipartFile multipartFile);
	Veicolo saveVeicolo(Veicolo veicolo);
	Veicolo getOne(int id);
	List<Veicolo> getAll();
	List<Veicolo> getByTipo(String tipo);
	List<Veicolo> getByBanner(String banner);
	List<Veicolo> getByDisponibile(String disponibile);
	List<GraficoVeicolo> sumTipo();
	void updateVeicolo(Veicolo veicolo);
	void deleteVeicolo(int id);

}
