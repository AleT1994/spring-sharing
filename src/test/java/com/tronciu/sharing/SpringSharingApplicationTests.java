package com.tronciu.sharing;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.caronte.sharing.entities.Posizione;
import com.caronte.sharing.entities.Veicolo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

class SpringSharingApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void test_00() {
		String body = "{\"descrizione\": \"STAZIONE 1 - Corso Stati Uniti 1\", \"latitudine\": 45.0625658, \"longitudine\": 7.6696263}";
		Posizione pos = new Posizione();
		ObjectMapper mapper = new ObjectMapper();
		Posizione x = null;
		try {
			x = mapper.readValue(body, Posizione.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		System.out.println(x);
	}

	@Test
	void test_01() {
		String body = "{\"nome\":\"sadasda\","
				+  "\"tipo\":\"autoElettrica\","
				+  "\"autonomia\":\"213km\","
				+  "\"immagine\":\"img/autoElettrica/1641615501463.JPG\","
				+ "\"posizioneAttuale\":{\"descrizione\": \"STAZIONE 1 - Corso Stati Uniti 1\", \"latitudine\": 45.0625658, \"longitudine\": 7.6696263}}";
		Veicolo pos = new Veicolo();
		ObjectMapper mapper = new ObjectMapper();
		Veicolo x = null;
		try {
			x = mapper.readValue(body, Veicolo.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		System.out.println(x);
		
		

	}

}
