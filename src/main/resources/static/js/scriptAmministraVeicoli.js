//////////////////////////////FUNZIONE ACCORDION//////////////////////////////////
$().ready(function () {
    var listaVeicoli = document.getElementById("accordionExample");
    var linkRisorsa = "http://localhost:9010/sharing/api/veicoli";

    fetch(linkRisorsa)
    .then(dati => {
        return dati.json()
    })
    .then(res => {
        for (var i = 0; i < res.length; i++) {
            var nome = res[i].nome;
            var img = res[i].immagine;
            var autonomia = res[i].autonomia;
            var posiz = res[i].posizioneAttuale.descrizione;
            listaVeicoli.innerHTML += '<div class="accordion-item">' +
                '<h2 class="accordion-header" id="heading' + i + '">' +
                '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' + i + '" aria-expanded="false" aria-controls="collapse' + i + '">' + nome + '</button>' +
                '</h2>' +
                '<div id="collapse' + i + '" class="accordion-collapse collapse" aria-labelledby="heading' + i + '" data-bs-parent="#accordionExample">' +
                '<div class="accordion-body">' +
                '<p>' + autonomia + '</p>' +
                '<p>' + posiz + '</p>' +
                '<div class="d-flex mb-3">' +
                '<button type="button" class="btn btn-danger btnicon me-2"><i class="fa fa-trash"></i></button>' +
                '<button type="button" class="btn btn-primary btnicon me-2"><i class="far fa-edit"></i></button>' +
                '</div>' +
                '<img src="' + img + '">' +
                '</div>' +
                '</div>' +
                '</div>';
        }
    })
});
//////////////////////////////FUNZIONE ACCORDION//////////////////////////////////