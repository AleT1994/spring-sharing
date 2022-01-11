///////////////////////FUNZIONE INSERIMENTO VEICOLO NEL DB/////////////////////////// 
function postVeicolo() {
    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("tipo").value;
    const autonomia = document.getElementById("autonom").value;
    const posizione = null;
    const image = document.getElementById("image").files[0];
    const nomeFile = image.name;
    const src = "img/" + tipo + "/" + nomeFile;
  
    switch (document.getElementById("posizione").value) {
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
     

    //@TODO make a fucking switch

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("tipo", tipo);
    formData.append("autonomia", autonomia);
    formData.append("posizioneAttuale", JSON.stringify(posizione));
    formData.append("immagine", src);
    formData.append("image", image);

    const URL = "http://localhost:9010/sharing/api/veicoli";

    fetch(URL, {
            method: 'POST',
            body: formData
        })
        .then(veicolo => {
            //svuoto elementi input veicolo
            document.getElementById("nomeVe").value = "";
            document.getElementById("categoria").value = "";
            document.getElementById("autonom").value = "";
            document.getElementById("staz").value = "";
            let blob = document.getElementById("image");
            blob.value = "";

           
        });
}
///////////////////////FUNZIONE INSERIMENTO VEICOLO NEL DB///////////////////////////


///////////////////CONTROLLO FORM INSERIMENTO VEICOLIO/////////////////////////
$().ready(function () {
    $('#form').validate({
        rules: {
            nomeVe: {
                required: true
            },
            autonom: {
                required: true
            },
            staz: {
                required: true
            }
        },
        messages: {
            nomeVe: 'Inserisci il nome del veicolo',
            autonom: "Inserisci l'autonomia del veicolo",
            staz: 'Inserisci la stazione di appartenenza'
        },
        errorElement: "span",
        submitHandler: function (form) {
            form.submit();
        }
    });
});
///////////////////CONTROLLO FORM INSERIMENTO VEICOLIO/////////////////////////