CREATE TABLE IF NOT EXISTS utenti ( 
email VARCHAR(30) NOT NULL PRIMARY KEY, 
password VARCHAR(30) NOT NULL,
ruolo ENUM("amministratore", "utente"), 
nome VARCHAR(40), 
cognome VARCHAR(40), 
nascita DATE NOT NULL,
patente CHAR(10),
foto_profilo VARCHAR(250)
); 

CREATE TABLE IF NOT EXISTS veicoli ( 
id INT auto_increment PRIMARY KEY,
nome VARCHAR(50) NOT NULL, 
tipo ENUM("bicicletta", "monopattino", "autoElettrica", "autoIbrida", "autoBenzina_Diesel") NOT NULL,
modello VARCHAR(20),
capacita VARCHAR(20),
potenza VARCHAR(20),
velocita_massima VARCHAR(20),
autonomia VARCHAR(20), 
descrizione VARCHAR(500),
posizione_attuale JSON,
disponibile ENUM("true", "false"), 
vista_banner ENUM("true", "false"),
immagine VARCHAR(250)
); 

CREATE TABLE IF NOT EXISTS prenotazioni ( 
id INT auto_increment PRIMARY KEY,
utente_email VARCHAR(30), 
veicolo_id INT, 
tipo ENUM("standard", "abbonamentoGiornaliero", "abbonamentoSettimanale", "abbonamentoMensile"),
stato ENUM("in corso", "conclusa") DEFAULT "in corso",
inizio_prenotazione DATETIME, 
fine_prenotazione DATETIME 
); 

