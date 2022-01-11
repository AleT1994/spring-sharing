///////////////////////FUNZIONE INSERIMENTO VEICOLO NEL DB/////////////////////////// 
function postVeicolo() {
    const nome = document.getElementById("nomeVe").value;
    const tipo = document.getElementById("categoria").value;
    const autonomia = document.getElementById("autonom").value;
    const posizioneAttuale = document.getElementById("posizione").value;
    const image = document.getElementById("image").files[0];
    const nomeFile = image.name

    const src = "img/" + tipo + "/" + nomeFile
  
    // oggetto per invio multipart file e altri parametri	

    var pos = {"descrizione": "STAZIONE 1 - Corso Stati Uniti 1", "latitudine": 45.0625658, "longitudine": 7.6696263 }

    //@TODO make a fucking switch

    
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("tipo", tipo);
    formData.append("autonomia", autonomia);
    formData.append("posizioneAttuale", JSON.stringify(pos));
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