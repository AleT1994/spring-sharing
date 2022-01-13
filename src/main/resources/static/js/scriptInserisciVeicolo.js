///////////////////////FUNZIONE INSERIMENTO VEICOLO NEL DB/////////////////////////// 
function postVeicolo(e) {

    //cancello gli span di errore quando rientro nella funzione
    $(".error").remove();

    //controllo campi di inserimento
    const tipo = document.getElementById("tipo").value;
    if (tipo == "") {
        $('#tipo').after(`<span class="error">Seleziona la tipologia del veicolo</span>`);
        e.preventDefault();
    }

    const nome = document.getElementById("nomeVeicolo").value;
    if (nome == "") {
        $('#nomeVeicolo').after(`<span class="error">Inserisci il nome del veicolo</span>`);
        e.preventDefault();
    }
    if (nome.length < 4) {
        $('#nomeVeicolo').after(`<span class="error">Il nome del veicolo è troppo corto</span>`);
        e.preventDefault();
    }
    if (nome.length > 50) {
        $('#nomeVeicolo').after(`<span class="error">Il nome del veicolo è troppo lungo</span>`);
        e.preventDefault();
    }


    const modello = document.getElementById("modello").value;
    if (modello == "") {
        $('#modello').after(`<span class="error">Inserisci il modello del veicolo</span>`);
        e.preventDefault();
    }
    if (modello.length < 3) {
        $('#modello').after(`<span class="error">Il modello del veicolo è troppo corto</span>`);
        e.preventDefault();
    }
    if (modello.length > 25) {
        $('#modello').after(`<span class="error">Il modello del veicolo è troppo lungo</span>`);
        e.preventDefault();
    }

    const capacita = document.getElementById("capacita").value;
    if (capacita == "") {
        $('#capacita').after(`<span class="error">Inserisci la capacita del veicolo</span>`);
        e.preventDefault();
    }
    if (capacita.length < 3) {
        $('#capacita').after(`<span class="error">La capacita del veicolo è troppo corta</span>`);
        e.preventDefault();
    }
    if (capacita.length > 15) {
        $('#capacita').after(`<span class="error">La capacita del veicolo è troppo lunga</span>`);
        e.preventDefault();
    }

    const potenza = document.getElementById("potenza").value;
    if (potenza == "") {
        $('#potenza').after(`<span class="error">Inserisci la potenza del veicolo</span>`);
        e.preventDefault();
    }
    if (potenza.length < 3) {
        $('#potenza').after(`<span class="error">La potenza del veicolo è troppo corta</span>`);
        e.preventDefault();
    }
    if (potenza.length > 15) {
        $('#potenza').after(`<span class="error">La potenza del veicolo è troppo lunga</span>`);
        e.preventDefault();
    }

    const velocita = document.getElementById("velocita").value;
    if (velocita == "") {
        $('#velocita').after(`<span class="error">Inserisci la velocita del veicolo</span>`);
        e.preventDefault();
    }
    if (velocita.length < 3) {
        $('#velocita').after(`<span class="error">La velocita del veicolo è troppo corta</span>`);
        e.preventDefault();
    }
    if (velocita.length > 15) {
        $('#velocita').after(`<span class="error">La velocita del veicolo è troppo lunga</span>`);
        e.preventDefault();
    }

    const autonomia = document.getElementById("autonomia").value;
    if (autonomia == "") {
        $('#autonomia').after(`<span class="error">Inserisci l'autonomia del veicolo</span>`);
        e.preventDefault();
    }
    if (autonomia.length < 3) {
        $('#autonomia').after(`<span class="error">L'autonomia del veicolo è troppo corta</span>`);
        e.preventDefault();
    }
    if (autonomia.length > 15) {
        $('#autonomia').after(`<span class="error">L'autonomia del veicolo è troppo lunga</span>`);
        e.preventDefault();
    }

    const descrizione = document.getElementById("descrizione").value;
    if (descrizione == "") {
        $('#descrizione').after(`<span class="error">Inserisci la descrizione del veicolo</span>`);
        e.preventDefault();
    }
    if (descrizione.length < 15) {
        $('#descrizione').after(`<span class="error">La descrizione del veicolo è troppo corta</span>`);
        e.preventDefault();
    }
    if (descrizione.length > 250) {
        $('#descrizione').after(`<span class="error">La descrizione del veicolo è troppo lunga</span>`);
        e.preventDefault();
    }

    const inputPosizione = document.getElementById("posizione").value;
    if (inputPosizione == "") {
        $('#posizione').after(`<span class="error">Inserisci la posizione attuale del veicolo</span>`);
        e.preventDefault();
    }


    const disponibile = document.getElementById("disponibile").checked;
    const banner = document.getElementById("banner").checked;

    const image = document.getElementById("image").files[0];
    if (image == undefined) {
        $('#image').after(`<span class="error">Inserisci la foto del veicolo</span>`);
        e.preventDefault();
    }
    const nomeFile = image.name;
    const src = "img/" + tipo + "/" + nomeFile;

    var posizione;
    switch (inputPosizione) {
        case "stazione1":
            posizione = {
                "descrizione": "STAZIONE 1 - Corso Stati Uniti 1",
                "latitudine": 45.0625658,
                "longitudine": 7.6696263
            };
            break;
        case "stazione2":
            posizione = {
                "descrizione": "STAZIONE 2 - Corso Inghilterra 47",
                "latitudine": 45.0754338,
                "longitudine": 7.6650673
            };
            break;
        case "stazione3":
            posizione = {
                "descrizione": "STAZIONE 3 - Via Giudeppe Verdi 61",
                "latitudine": 45.0665578,
                "longitudine": 7.6972264
            };
            break;
        case "stazione4":
            posizione = {
                "descrizione": "STAZIONE 4 - Corso Regio Parco 12",
                "latitudine": 45.0753703,
                "longitudine": 7.6912162
            };
            break;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("tipo", tipo);
    formData.append("modello", modello);
    formData.append("capacita", capacita);
    formData.append("potenza", potenza);
    formData.append("velocitaMassima", velocita);
    formData.append("autonomia", autonomia);
    formData.append("descrizione", descrizione);
    formData.append("posizioneAttuale", JSON.stringify(posizione));
    formData.append("disponibile", disponibile);
    formData.append("vistaBanner", banner);
    formData.append("immagine", src);
    formData.append("image", image);

    const URL = "http://localhost:9010/sharing/api/veicoli";

    fetch(URL, {
            method: 'POST',
            body: formData
        })
        .then(() => {
            showMessage('<div class="alert alert-success" role="alert">La tua azione è andata a buon fine</div>');
            setTimeout(hideMessage, 5000);
        })
        .then(() => {
            //svuoto elementi input veicolo
            document.getElementById("nomeVeicolo").value = "";
            document.getElementById("tipo").value = "";
            document.getElementById("modello").value = "";
            document.getElementById("capacita").value = "";
            document.getElementById("potenza").value = "";
            document.getElementById("velocita").value = "";
            document.getElementById("autonomia").value = "";
            document.getElementById("descrizione").value = "";
            document.getElementById("posizione").value = "";
            document.getElementById("disponibile").checked = true;
            document.getElementById("banner").checked = false;
            document.getElementById("image").value = "";
        });
}

function showMessage(message) {
    document.getElementById("apiMessage").innerHTML = message;
}

function hideMessage() {
    document.getElementById("apiMessage").innerHTML = '';
}
///////////////////////FUNZIONE INSERIMENTO VEICOLO NEL DB///////////////////////////