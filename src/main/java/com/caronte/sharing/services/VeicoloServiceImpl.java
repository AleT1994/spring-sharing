package com.caronte.sharing.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.caronte.sharing.entities.GraficoVeicolo;
import com.caronte.sharing.entities.Veicolo;
import com.caronte.sharing.repos.VeicoloDAO;

@Service
public class VeicoloServiceImpl implements VeicoloService {

	@Autowired
	private VeicoloDAO repoVeicoli;

	@Override
	public Veicolo addVeicolo(Veicolo veicolo) {
		veicolo.setDisponibile("true");
		veicolo.setVistaBanner("false");
		return this.repoVeicoli.save(veicolo);
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
	public List<Veicolo> getByDisponibilita(String disponibile) {
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
	public Veicolo updateVeicolo(Veicolo veicolo) {
		return this.repoVeicoli.save(veicolo);
	}

	@Override
	public void deleteVeicolo(int id) {
		this.repoVeicoli.deleteById(id);
	}

}
