///////////////////////INIZIALIZZAZIONE SWIPER///////////////////////////
const swiper = new Swiper(".mySwiper", {
    cssMode: true,
    keyboard: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 5000,
    },
    rewind: true
});
///////////////////////INIZIALIZZAZIONE SWIPER///////////////////////////


///////////////////////FUNZIONE BANNER DINAMICO///////////////////////////
$().ready(function () {
    const URLbanner = "http://localhost:9010/sharing/api/veicoli/banner/true";
    var divSwiper = document.getElementById("swiper");

    //prendo i dati da /api/veicoli/banner/true
    fetch(URLbanner)
        .then(dati => {
            return dati.json()
        })
        .then(response => {
            for (var i = 0; i < response.length; i++) {
                var nome = response[i].nome;
                var img = response[i].immagine;
                var descrizione = response[i].descrizione;

                var tastoId = "btnPrenota-" + i;

                //scrivo nell'HTML i dati dell'auto
                divSwiper.innerHTML += '<div class="swiper-slide">' +
                    '<img src=' + img + ' alt="slide_' + i + '">' +
                    '<div class="row wrapperDettaglio">' +
                    '<div class="col-12 col-md-7 col-lg-5 d-flex flex-column justify-content-center align-items-flex-start dettagliVeicolo">' +
                    '<h2>' + nome + '</h2>' +
                    '<p>' + descrizione + '</p>' +
                    '<a href="prenota-veicolo.html">' +
                    '<button type="button" id="' + tastoId + '" class="btn btn-primary" onclick="getDati(' + i + ')">Prenota</button>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

                //collego a ogni bottone "Prenota" i dati della sua auto sotto forma di Stringa (con attributo obj)
                var btnPrenota = document.getElementById(tastoId);
                var stringifiedObj = JSON.stringify(response[i]);
                btnPrenota.setAttribute("obj", stringifiedObj);
            }
        });
});
///////////////////////FUNZIONE BANNER DINAMICO///////////////////////////


///////////////////////FUNZIONE PULSANTE PRENOTA///////////////////////////
//funzione per recuperare la stringa dei dati dell'auto e salvarla in sessione
function getDati(id) {
    var tastoId = "btnPrenota-" + id;
    var objVeicolo = JSON.parse(document.getElementById(tastoId).getAttribute("obj"));
    if (Modernizr.sessionstorage) {
        sessionStorage.setItem("datiVeicolo", JSON.stringify(objVeicolo));
    }
}
///////////////////////FUNZIONE PULSANTE PRENOTA///////////////////////////


///////////////////////FUNZIONE GRAFICO DINAMICO///////////////////////////
const URLgrafico = "http://localhost:9010/sharing/api/veicoli/tipo/somma";

//recupero i dati da api/tipo/somma per rendere grafico dinamico in base a DB
fetch(URLgrafico)
    .then(dati => {
        return dati.json()
    })
    .then(response => {
        var listaLabels = [];
        var listaData = [];

        for (var i = 0; i < response.length; i++) {
            var tipo;
            switch (response[i].tipoVeicolo) {
                case "bicicletta":
                    tipo = "Bicicletta Elettrica";
                    break;
                case "monopattino":
                    tipo = "Monopattino Elettrico";
                    break;
                case "autoElettrica":
                    tipo = "Auto Elettrica";
                    break;
                case "autoIbrida":
                    tipo = "Auto Ibrida";
                    break;
            }
            listaLabels.push(tipo);

            var somma;
            switch (response[i].tipoVeicolo) {
                case "bicicletta":
                    somma = (response[i].sommaTipo) * 10;
                    break;
                case "monopattino":
                    somma = (response[i].sommaTipo) * 9;
                    break;
                case "autoElettrica":
                    somma = (response[i].sommaTipo) * 8;
                    break;
                case "autoIbrida":
                    somma = (response[i].sommaTipo) * 6;
                    break;
            }
            listaData.push(somma);
        }
        
        const divGrafico = document.getElementById("myChart");
        const myChart = new Chart(
            divGrafico, {
                type: 'doughnut',
                data: {
                    labels: listaLabels,
                    datasets: [{
                        label: 'Risparmio di Co2 per Km',
                        data: listaData,
                        backgroundColor: [
                            'rgb(255, 89, 148)',
                            'rgb(255, 150, 104)',
                            'rgb(237, 255, 143)',
                            'rgb(130, 182, 255)'
                        ],
                        hoverOffset: 4
                    }]
                }
            }
        )
    });
///////////////////////FUNZIONE GRAFICO DINAMICO///////////////////////////