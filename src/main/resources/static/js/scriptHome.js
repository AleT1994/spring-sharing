$().ready(function () {
    caricaBanner();
});

///////////////////////INIZIALIZZAZIONE SWIPER///////////////////////////
    const swiper = new Swiper(".mySwiper", {
        cssMode: true,
        mousewheel: true,
        keyboard: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        autoplay: {
            delay: 5000,
        }
    });
///////////////////////INIZIALIZZAZIONE SWIPER///////////////////////////


///////////////////////FUNZIONE BANNER DINAMICO///////////////////////////
function caricaBanner() {
    const URLbanner = "http://localhost:9010/sharing/api/veicoli/banner/true";
    var divSwiper = document.getElementById("swiper")
    fetch(URLbanner)
        .then(dati => {
            return dati.json()
        })
        .then(response => {
            for (var i = 0; i < response.length; i++) {
                var nome = response[i].nome;
                var img = response[i].immagine;
                var tipo = response[i].tipo;
                switch (response[i].tipo) {
                    case "bicicletta":
                        tipo = "Bicicletta";
                        break;
                    case "monopattino":
                        tipo = "Monopattino";
                        break;
                    case "autoElettrica":
                        tipo = "Auto Elettrica";
                        break;
                    case "autoIbrida":
                        tipo = "Auto Ibrida";
                        break;
                    case "autoBenzinaDiesel":
                        tipo = "Auto Benzina/Diesel";
                        break;

                }
                var autonomia = response[i].autonomia;

                var tastoId = "btnPrenota-" + i;
                divSwiper.innerHTML += '<div class="swiper-slide d-flex justify-content-start">' +
                    '<img src=' + img + ' alt="slide_' + i + '">' +
                    '' +
                    '<div class="wrapperDettaglio">' +
                    '<div class="dettagliVeicolo">' +
                    '<h2>' + nome + '</h2>' +
                    '<p>' + "Tipologia: " + tipo + '</p>' +
                    '<p>' + "Autonomia: " + autonomia + '</p>' +
                    '<a href="prenota-veicolo.html">' +
                    '<button type="button" id="' + tastoId + '" class="btn btn-primary"  onclick="getDati(' + i + ')" >Prenota</button>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

                var btnPrenota = document.getElementById(tastoId);
                var stringifiedObj = JSON.stringify(response[i]);
                btnPrenota.setAttribute("obj", stringifiedObj);
            }
        });
}
///////////////////////FUNZIONE BANNER DINAMICO///////////////////////////


///////////////////////FUNZIONE PULSANTE PRENOTA///////////////////////////
function getDati(evt) {
    var tastoId = "btnPrenota-" + evt;
    var objVeicolo = JSON.parse(document.getElementById(tastoId).getAttribute("obj"));
    if (Modernizr.sessionstorage) {
        sessionStorage.setItem("datiVeicolo", JSON.stringify(objVeicolo));
    }
}
///////////////////////FUNZIONE PULSANTE PRENOTA///////////////////////////


///////////////////////FUNZIONE GRAFICO DINAMICO///////////////////////////
const divGrafico = document.getElementById("myChart");
const myChart = new Chart(
    divGrafico, {
        type: 'doughnut',
        data: {
            labels: [
                'Biciclette',
                'Monopattini',
                'Auto Ibride',
                'Auto Diesel/Benzina',
                'Auto Elettriche'
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [300, 50, 100, 60, 200],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(255, 205, 200)',
                    'rgb(54, 162, 235)'
                ],
                hoverOffset: 4
            }]
        }
    }
)
///////////////////////FUNZIONE GRAFICO DINAMICO///////////////////////////