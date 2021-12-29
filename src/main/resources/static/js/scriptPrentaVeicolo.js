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


///////////////////////FUNZIONE MAPPA///////////////////////////
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(map);
///////////////////////FUNZIONE MAPPA///////////////////////////