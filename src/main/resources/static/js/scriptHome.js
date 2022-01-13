///////////////////////FUNZIONE BANNER DINAMICO///////////////////////////

//inizializzo lo swiper
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


//prendo i dati dei veicoli dall'api/veicoli/banner/true e li stampo nella pagina
$().ready(function () {

    const URLbanner = "http://localhost:9010/sharing/api/veicoli/banner/true";
    var divSwiper = document.getElementById("swiper");


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

//recupero i dati da api/tipo/somma per rendere grafico dinamico in base a DB
const URLgrafico = "http://localhost:9010/sharing/api/prenotazioni/stato/conclusa";

fetch(URLgrafico)
    .then(dati => {
        return dati.json()
    })
    .then(response => {

        var listaLabels = ["Bicicletta", "Monopattino", "A. Elettrica", "A. Ibrida", "A. Benzina/Diesel"]

        var idVeicoli = []

        var sommabici = 0;
        var sommamonopattino = 0;
        var sommaautoele = 0;
        var sommaautoibri = 0;
        var sommaautobenzdies = 0;

        for (var i = 0; i < response.length; i++) {

            idVeicoli.push(response[i].veicoloId)

        }


        fetch("http://localhost:9010/sharing/api/veicoli")
            .then(dati => {
                return dati.json()
            })
            .then(res => {



                for (var j = 0; j < res.length; j++) {


                    for (var k = 0; k < idVeicoli.length; k++) {


                        if (res[j].id == idVeicoli[k]) {


                            switch (res[j].tipo) {
                                case "bicicletta":
                                    sommabici += 10;
                                    break;
                                case "monopattino":
                                    sommamonopattino += 9.5;
                                    break;
                                case "autoElettrica":
                                    sommaautoele += 6;
                                    break;
                                case "autoIbrida":
                                    sommaautoibri += 4;
                                    break;
                                case "autoBenzina_Diesel":
                                    sommaautobenzdies += 0.9;
                                    break;
                            }




                        }



                    }



                }



                const divGrafico = document.getElementById("myChart");
                const myChart = new Chart(
                    divGrafico, {
                        type: 'doughnut',
                        data: {
                            labels: listaLabels,
                            datasets: [{
                                label: 'Risparmio di Co2 per Km',
                                data: [sommabici, sommamonopattino, sommaautoele, sommaautoibri, sommaautobenzdies],
                                backgroundColor: [
                                    'rgb(217, 127, 199)',
                                    'rgb(237, 84, 68)',
                                    'rgb(33, 172, 169)',
                                    'rgb(117, 117, 187)',
                                    'rgb(211, 218, 63)'
                                ],
                                hoverOffset: 4
                            }]
                        }
                    }
                )



            })
    });
///////////////////////FUNZIONE GRAFICO DINAMICO///////////////////////////