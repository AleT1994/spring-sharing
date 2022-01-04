///////////////////////FUNZIONE PRENDI DATI///////////////////////////
    var imgVeicolo = document.getElementById("imgVeicolo");
    var nomeVeicolo = document.getElementById("nomeVeicolo");
    var tipoVeicolo = document.getElementById("tipoVeicolo");
    var autonomiaVeicolo = document.getElementById("autonomiaVeicolo");

    var objVeicolo = {};

    if (Modernizr.sessionstorage) {
        objVeicolo = JSON.parse(sessionStorage.getItem("datiVeicolo"));
    }

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


///////////////////////FUNZIONE MAPPA///////////////////////////45.0712087,7.6034829
var map = L.map('map').setView([objVeicolo.posizioneAttuale.latitudine, objVeicolo.posizioneAttuale.longitudine], 15);

var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

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

var marker = L.marker([objVeicolo.posizioneAttuale.latitudine, objVeicolo.posizioneAttuale.longitudine], {icon: myIcon}).addTo(map);
marker.bindPopup(objVeicolo.posizioneAttuale.descrizione).openPopup();
///////////////////////FUNZIONE MAPPA///////////////////////////


///////////////////////FUNZIONE FORM PRENOTAZIONE///////////////////////////

///////////////////////FUNZIONE FORM PRENOTAZIONE///////////////////////////

