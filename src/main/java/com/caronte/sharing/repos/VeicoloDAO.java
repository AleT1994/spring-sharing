package com.caronte.sharing.repos;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.caronte.sharing.entities.Veicolo;

@Repository
public interface VeicoloDAO extends JpaRepository<Veicolo, Integer> {

	List<Veicolo> findByTipo(String tipo);
	List<Veicolo> findByVistaBanner(String vistaBanner);
	List<Veicolo> findByDisponibile(String disponibile);

	@Query(value="SELECT tipo as tipoVeicolo, COUNT(tipo) as sommaTipo FROM veicoli GROUP BY tipo ORDER BY tipo", nativeQuery = true)
    List<Map<String, Integer>> sumTipoGroupByTipo();

}
