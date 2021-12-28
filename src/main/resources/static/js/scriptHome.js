///////////////////////FUNZIONE SWIPER///////////////////////////
var swiper = new Swiper(".mySwiper", {
    cssMode: true,
    mousewheel: true,
    keyboard: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
    },
    autoplay: {
        delay: 5000,
    }
});
///////////////////////FUNZIONE SWIPER///////////////////////////

const URL = "http://localhost:9010/sharing/api/veicoli/banner/true";
var divSwiper = document.getElementById("swiper")
fetch(URL)
    .then(dati => {
        return dati.json()
    })
    .then(res => {
        for (var i = 0; i < res.length; i++) {
            var nome = res[i].nome;
            var img = res[i].immagine;
            var tipo = res[i].tipo;
            var autonomia = res[i].autonomia;
            divSwiper.innerHTML += '<div class="swiper-slide d-flex justify-content-start">' +
            '<img src=' + img + ' alt="slide_' + i + '">' +
            '' +
            '<div class="wrapperDettaglio">' +
            '<div class="dettagliVeicolo">' +
            '<h2>' + nome + '</h2>' +
            '<p>' + "Tipologia: " + tipo + '</p>' +
            '<p>' + "Autonomia: " + autonomia + '</p>' +
            '<a class="btn btn-primary" href="' + "http://localhost:9010/sharing/prenotazione.html" + '" role="button">Prenota</a>' +
            '</div>' +
            '</div>' +
            '</div>';
    }
});
///////////////////////FUNZIONE BANNER DINAMICO///////////////////////////
// var objVeicolo = {};
// objVeicolo.nome = document.getElementById("nomeVe").value;
// objVeicolo.autonomia = document.getElementById("autonom").value;
// objVeicolo.stazione = document.getElementById("staz").value;
// objVeicolo.categoria = document.getElementById("categoria").value;

// var btnAddVehicle = document.getElementById("btnAddVehicle");


// btnAddVehicle.addEventListener("click", () => {
    // $('#form').submit(function (e) {
    //     e.preventDefault();
    //     console.log("hey!");

    //         function costruttoreVeicolo() {
    //             this.nome = document.getElementById("nomeVe").value;
    //             this.tipo = document.getElementById("categoria").value;
    //             this.autonomia = document.getElementById("autonom").value;
    //             this.posizioneAttuale = document.getElementById("staz").value;
    //         }
    //         var objVeicolo = new costruttoreVeicolo();
    //         var objJsonVeicoli = JSON.stringify(objVeicolo);
    //         console.log(objVeicolo);

    //         fetch("http://localhost:9077/sharing/api_veicoli", {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: objJsonVeicoli
    //         })
    //     });
///////////////////////FUNZIONE BANNER DINAMICO///////////////////////////



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
