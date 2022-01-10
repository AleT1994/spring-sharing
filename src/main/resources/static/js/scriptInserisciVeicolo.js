///////////////////////FUNZIONE INSERIMENTO VEICOLO NEL DB///////////////////////////   
// aggiungi veicolo
//document.getElementById("form").addEventListener("submit", postVeicolo);

function postVeicolo() {
    console.log("ciao");
    const nome = document.getElementById("nomeVe").value;
    const tipo = document.getElementById("categoria").value;
    const autonomia = document.getElementById("autonom").value;
    //const posizioneAttuale = document.getElementById("staz").value;
    const image = document.getElementById("image").files[0];
    const nomeFile = image.name

    const src = "img/" + tipo + "/" + nomeFile
  
    // oggetto per invio multipart file e altri parametri	
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("tipo", tipo);
    formData.append("autonomia", autonomia);
    //formData.append("posizioneAttuale", posizioneAttuale);
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
/*$().ready(function () {
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
});*/
///////////////////CONTROLLO FORM INSERIMENTO VEICOLIO/////////////////////////