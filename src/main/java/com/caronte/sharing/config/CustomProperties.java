package com.caronte.sharing.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class CustomProperties {

	// cartella dove salvare le immagini
	public static String basepath = "src/main/resources/static/img";
	
	// immagine di default del veicolo, se non e' stata caricata
	public static String defaultImg = "img/veicoloDefault.jpg";
	
}