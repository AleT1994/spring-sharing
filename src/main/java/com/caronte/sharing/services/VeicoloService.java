package com.caronte.sharing.services;

import java.util.List;

import com.caronte.sharing.entities.GraficoVeicolo;
import com.caronte.sharing.entities.Veicolo;

public interface VeicoloService {

	Veicolo addVeicolo(Veicolo veicolo);
	Veicolo getOne(int id);
	List<Veicolo> getAll();
	List<Veicolo> getByTipo(String tipo);
	List<Veicolo> getByBanner(String banner);
	List<Veicolo> getByDisponibilita(String disponibile);
	List<GraficoVeicolo> sumTipo();
	Veicolo updateVeicolo(Veicolo veicolo);
	void deleteVeicolo(int id);
}
