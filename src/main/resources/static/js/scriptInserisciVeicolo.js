///////////////////////FUNZIONE INSERIMENTO VEICOLO NEL DB/////////////////////////// 
function postVeicolo() {
    const nome = document.getElementById("nomeAuto").value;
    const tipo = document.getElementById("tipo").value;
    const modello = document.getElementById("modello").value;
    const capacita = document.getElementById("capacita").value;
    const potenza = document.getElementById("potenza").value;
    const velocita = document.getElementById("velocita").value;
    const autonomia = document.getElementById("autonomia").value;
    const descrizione = document.getElementById("descrizione").value;
    const inputPosizione = document.getElementById("posizione").value;
    const inputDisponibile = document.getElementById("disponibile").value;
    const inputBanner = document.getElementById("banner").value;
    const image = document.getElementById("image").files[0];
    const nomeFile = image.name;
    const src = "img/" + tipo + "/" + nomeFile;
  
    var disponibile;
    if(inputDisponibile == "on") {
        disponibile = "true";
    } else {
        disponibile = "false";
    }
    
    var posizione;
    switch (inputPosizione) {
        case "stazione1":
            posizione = {"descrizione": "STAZIONE 1 - Corso Stati Uniti 1", "latitudine": 45.0625658, "longitudine": 7.6696263 };
            break;
        case "stazione2":
            posizione = {"descrizione": "STAZIONE 2 - Corso Inghilterra 47", "latitudine": 45.0754338, "longitudine": 7.6650673};
            break;
        case "stazione3":
            posizione = {"descrizione": "STAZIONE 3 - Via Giudeppe Verdi 61", "latitudine": 45.0665578, "longitudine": 7.6972264};
            break;
        case "stazione4":
            posizione = {"descrizione": "STAZIONE 4 - Corso Regio Parco 12", "latitudine": 45.0753703, "longitudine": 7.6912162};
            break;
    }
     
    console.log(posizione);
    console.log(disponibile);

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("tipo", tipo);
    formData.append("modello", modello);
    formData.append("capacita", capacita);
    formData.append("potenza", potenza);
    formData.append("velocitaMassima", velocita);
    formData.append("autonomia", autonomia);
    formData.append("autonomia", descrizione);
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
            //svuoto elementi input veicolo
            document.getElementById("nomeAuto").value = "";
            document.getElementById("tipo").value = "";
            document.getElementById("autonomia").value = "";
            document.getElementById("posizione").value = "";
            let blob = document.getElementById("image");
            blob.value = "";
        });
}
///////////////////////FUNZIONE INSERIMENTO VEICOLO NEL DB///////////////////////////


///////////////////CONTROLLO FORM INSERIMENTO VEICOLIO/////////////////////////
$().ready(function () {
    $('#form').validate({
        rules: {
            nomeAuto: {
                required: true
            },
            autonomia: {
                required: true
            },
            posizione: {
                required: true
            }
        },
        messages: {
            nomeAuto: 'Inserisci il nome del veicolo',
            autonomia: "Inserisci l'autonomia del veicolo",
            posizione: 'Inserisci la stazione di appartenenza'
        },
        errorElement: "span",
        submitHandler: function (form) {
            form.submit();
        }
    });
});
///////////////////CONTROLLO FORM INSERIMENTO VEICOLIO/////////////////////////