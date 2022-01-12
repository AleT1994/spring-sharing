///////////////////////FUNZIONE PRENDI DATI///////////////////////////
//recupero gli elementi dall'HMTL
var imgVeicolo = document.getElementById("imgVeicolo");
var nomeVeicolo = document.getElementById("nomeVeicolo");
var tipoVeicolo = document.getElementById("tipoVeicolo");
var autonomiaVeicolo = document.getElementById("autonomiaVeicolo");

//creo un oggetto per salvare i dati dalla Session Storage
var objVeicolo = {};

if (Modernizr.sessionstorage) {
    objVeicolo = JSON.parse(sessionStorage.getItem("datiVeicolo"));
}

//setto gli elementi HTML secondo i contenuti del mio objVeicolo
imgVeicolo.setAttribute("src", objVeicolo.immagine);
nomeVeicolo.innerText = objVeicolo.nome;
switch (objVeicolo.tipo) {
    case "bicicletta":
        tipoVeicolo.innerText = "Tipologia: Bicicletta";
        break;
    case "monopattino":
        tipoVeicolo.innerText = "Tipologia: Monopattino";
        break;
    case "autoElettrica":
        tipoVeicolo.innerText = "Tipologia: Auto Elettrica";
        break;
    case "autoIbrida":
        tipoVeicolo.innerText = "Tipologia: Auto Ibrida";
        break;
    case "autoBenzinaDiesel":
        tipoVeicolo.innerText = "Tipologia: Auto Benzina/Diesel";
        break;
}
autonomiaVeicolo.innerText = "Autonomia: " + objVeicolo.autonomia;
///////////////////////FUNZIONE PRENDI DATI///////////////////////////


///////////////////////FUNZIONE MAPPA///////////////////////////
//inizializzazione della mappa
var map = L.map('map').setView([objVeicolo.posizioneAttuale.latitudine, objVeicolo.posizioneAttuale.longitudine], 15);

var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

//imposto un'iconcina sulla mappa diversa a seconda del tipo di veicolo
var URLIcona;
switch (objVeicolo.tipo) {
    case "bicicletta":
        URLIcona = "img/iconeMappa/bicicletta.svg";
        break;
    case "monopattino":
        URLIcona = "img/iconeMappa/monopattino.svg";
        break;
    case "autoElettrica":
        URLIcona = "img/iconeMappa/auto.svg";
        break;
    case "autoIbrida":
        URLIcona = "img/iconeMappa/auto.svg";
        break;
    case "autoBenzinaDiesel":
        URLIcona = "img/iconeMappa/auto.svg";
        break;
}


var myIcon = L.icon({
    iconUrl: URLIcona,
    iconSize: [38, 38],
    iconAnchor: [22, 22],
    popupAnchor: [-3, -22],
});

//conferisco le coordinate della posizione del veicolo per definire il marker sulla mappa
var marker = L.marker([objVeicolo.posizioneAttuale.latitudine, objVeicolo.posizioneAttuale.longitudine], {
    icon: myIcon
}).addTo(map);
marker.bindPopup(objVeicolo.posizioneAttuale.descrizione).openPopup();
///////////////////////FUNZIONE MAPPA///////////////////////////


///////////////////////FUNZIONE FORM PRENOTAZIONE///////////////////////////
$().ready(function () {

    var date = new Date();
    var gg = date.getDate();
    if (gg < 10) {
        gg = "0" + gg;
    }
    var mo = date.getMonth() + 1;
    if (mo < 10) {
        mo = "0" + mo;
    }
    var yyyy = date.getFullYear();
    var hh = date.getHours();
    var mi = date.getMinutes();
    var today = yyyy + "-" + mo + "-" + gg + "T" + hh + ":" + mi;
    var maxDate = (yyyy + 1) + "-" + mo + "-" + gg + "T" + hh + ":" + mi;
    console.log(today);
    $('#dataOraPrenotazione').attr("min", today);
    $('#dataOraPrenotazione').attr("max", maxDate);

    $('#formPrenotazione').validate({
        rules: {
            dataOraPrenotazione: {
                required: true,
                date: true
            }
        },
        messages: {
            dataOraPrenotazione: "Devi inserire un valore valido di tipo data e ora"
        },
        errorElement: "span",
        submitHandler: function () {


        }
    });

});

$('#prenota').click(function () {

    //prendo email dallo Storage
    var emailStorage;

    if (Modernizr.localstorage) {

        var utenteStorage = JSON.parse(localStorage.getItem("tokenLogin"));
        console.log(utenteStorage);
        emailStorage = utenteStorage.email;

    }

    //prendo id veicolo dalla storage
    var idVeicoloStorage = objVeicolo.id;
    console.log(idVeicoloStorage);

    dataOraInput = $('#dataOraPrenotazione').val();
    console.log(dataOraInput);

    var objPrenotazione = {
        utenteEmail: emailStorage,
        veicoloId: idVeicoloStorage,
        inizioPrenotazione: dataOraInput
    }
    console.log(objPrenotazione);

    const URLprenotazione = "http://localhost:9010/sharing/api/prenotazioni";

    //salvo i dati su tabella prenotazioni nel DB con POST su api/prenotazioni
    fetch(URLprenotazione, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(objPrenotazione)
    });

})
///////////////////////FUNZIONE FORM PRENOTAZIONE///////////////////////////