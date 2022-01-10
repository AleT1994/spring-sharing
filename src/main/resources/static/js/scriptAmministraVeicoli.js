//////////////////////////////FUNZIONE ACCORDION//////////////////////////////////
$().ready(function () {

    //array per salvare i veicoli
    var arrayVeicoli = [];
    //set per salvare tipi veicolo
    var setTipo = new Set();

    //recupero la lista completa dei veicoli in catalogo dall'api/veicoli e la salvo in Session Storage
    var linkRisorsa = "http://localhost:9010/sharing/api/veicoli";
    fetch(linkRisorsa)
        .then(dati => {
            return dati.json()
        })
        .then(res => {

            for (var i = 0; i < res.length; i++) {
                arrayVeicoli.push(res[i]);
                setTipo.add(res[i].tipo);
            }

            //salvo la lista dei veicoli in SessionStorage per poterli filtrare per tipo
            if (Modernizr.sessionstorage) {
                sessionStorage.setItem("veicoli", JSON.stringify(arrayVeicoli));
            }

            addFilterBtns(setTipo);
            addAccordions();
        });

});


//stampo nella pagina la lista dei bottoni per filtrare i veicoli
function addFilterBtns(setTipo) {

    var divBtnFilter = document.getElementById("btnContainer");

    setTipo.forEach(function (tipo) {

        var nomeBtn;
        switch (tipo) {
            case "bicicletta":
                nomeBtn = "Bicicletta";
                break;
            case "monopattino":
                nomeBtn = "Monopattino";
                break;
            case "autoElettrica":
                nomeBtn = "Auto Elettrica";
                break;
            case "autoIbrida":
                nomeBtn = "Auto Ibrida";
                break;
        }

        divBtnFilter.innerHTML += '<button class="btn" id="btn-' + tipo + '" >' + nomeBtn + '</button>';
        $('#btn-' + tipo).attr('onclick', 'filter("' + tipo + '")');
    })
}


function addAccordions() {

    //recupero i dati dalla Session Storage e li salvo in un array
    arrayObjVeicoli = [];
    if (Modernizr.sessionstorage) {
        arrayObjVeicoli = JSON.parse(sessionStorage.getItem("veicoli"));
    }

    //ciclo i dati dell'array per ottenere gli accordion di tutti i veicoli in catalogo
    var listaVeicoli = document.getElementById("accordionExample");

    for (var i = 0; i < arrayObjVeicoli.length; i++) {

        var nome = arrayObjVeicoli[i].nome;
        var img = arrayObjVeicoli[i].immagine;
        var autonomia = arrayObjVeicoli[i].autonomia;
        //var posiz = arrayObjVeicoli[i].posizioneAttuale.descrizione;

        var tipoVeicolo;
        switch (arrayObjVeicoli[i].tipo) {
            case "bicicletta":
                tipoVeicolo = "Bicicletta";
                break;
            case "monopattino":
                tipoVeicolo = "Monopattino";
                break;
            case "autoElettrica":
                tipoVeicolo = "Auto Elettrica";
                break;
            case "autoIbrida":
                tipoVeicolo = "Auto Ibrida";
                break;
        }

        var idVeicolo = arrayObjVeicoli[i].id;
        var cancId = "btnCancella-" + idVeicolo;
        var modifId = "btnModifica-" + idVeicolo;

        listaVeicoli.innerHTML += '<div id="accordion-' + idVeicolo + '" class="accordion-item">' +
            '<h2 class="accordion-header" id="heading' + i + '">' +
            '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' + i + '" aria-expanded="false" aria-controls="collapse' + i + '">' + nome + '</button>' +
            '</h2>' +
            '<div id="collapse' + i + '" class="accordion-collapse collapse" aria-labelledby="heading' + i + '" data-bs-parent="#accordionExample">' +
            '<div class="accordion-body">' +
            '<p>' + autonomia + '</p>' +
            //        '<p>' + posiz + '</p>' +
            '<div class="d-flex mb-3">' +
            '<button type="button" id="' + cancId + '" class="btn btn-danger" onclick="eliminaDati(' + idVeicolo + ')"><i class="fa fa-trash"></i></button>' +
            '<button type="button" id="' + modifId + '" class="btn btn-primary" onclick="modificaDati(' + idVeicolo + ')"><i class="far fa-edit"></i></button>' +
            '</div>' +
            '<img src="' + img + '">' +
            '</div>' +
            '</div>' +
            '</div>';

    }
}


//funzione per recuperare la lista dei veicoli in catalogo secondo il tipo
function filter(tipo) {

    //pulisco il div che contiene gli accordion
    var listaVeicoli = document.getElementById("accordionExample");
    listaVeicoli.innerHTML = "";

    if (tipo == "tutti") {

        addAccordions();

    } else {

        arrayObjVeicoli = [];
        if (Modernizr.sessionstorage) {
            arrayObjVeicoli = JSON.parse(sessionStorage.getItem("veicoli"));
        }

        for (var i = 0; i < arrayObjVeicoli.length; i++) {

            if (arrayObjVeicoli[i].tipo == tipo) {

                var nome = arrayObjVeicoli[i].nome;
                var img = arrayObjVeicoli[i].immagine;
                var autonomia = arrayObjVeicoli[i].autonomia;
                var posiz = arrayObjVeicoli[i].posizioneAttuale.descrizione;

                var tipoVeicolo;
                switch (arrayObjVeicoli[i].tipo) {
                    case "bicicletta":
                        tipoVeicolo = "Bicicletta";
                        break;
                    case "monopattino":
                        tipoVeicolo = "Monopattino";
                        break;
                    case "autoElettrica":
                        tipoVeicolo = "Auto Elettrica";
                        break;
                    case "autoIbrida":
                        tipoVeicolo = "Auto Ibrida";
                        break;
                }

                var idVeicolo = arrayObjVeicoli[i].id;
                var cancId = "btnCancella-" + idVeicolo;
                var modifId = "btnModifica-" + idVeicolo;

                listaVeicoli.innerHTML += '<div id="accordion-' + idVeicolo + '" class="accordion-item">' +
                    '<h2 class="accordion-header" id="heading' + i + '">' +
                    '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' + i + '" aria-expanded="false" aria-controls="collapse' + i + '">' + nome + '</button>' +
                    '</h2>' +
                    '<div id="collapse' + i + '" class="accordion-collapse collapse" aria-labelledby="heading' + i + '" data-bs-parent="#accordionExample">' +
                    '<div class="accordion-body">' +
                    '<p>' + autonomia + '</p>' +
                    //        '<p>' + posiz + '</p>' +
                    '<div class="d-flex mb-3">' +
                    '<button type="button" id="' + cancId + '" class="btn btn-danger" onclick="eliminaDati(' + idVeicolo + ')"><i class="fa fa-trash"></i></button>' +
                    '<button type="button" id="' + modifId + '" class="btn btn-primary" onclick="modificaDati(' + idVeicolo + ')"><i class="far fa-edit"></i></button>' +
                    '</div>' +
                    '<img src="' + img + '">' +
                    '</div>' +
                    '</div>' +
                    '</div>';

            }
        }
    }
}


function eliminaDati(id) {

    const URL = "http://localhost:9010/sharing/api/veicoli/id/" + id;
    fetch(URL, {
            method: 'DELETE'
        })
        .then(()=>{
            document.getElementById("accordion-"+id).innerHTML = '';
            showMessage('<div class="alert alert-success" role="alert">La tua azione è andata a buon fine</div>');
            setTimeout(hideMessage, 5000);
        });

}

function showMessage (message) {
    document.getElementById("apiMessage").innerHTML = message;
}

function hideMessage () {
    document.getElementById("apiMessage").innerHTML= '';
}

function modificaDati(id) {

    arrayObjVeicoli = [];
        if (Modernizr.sessionstorage) {
            arrayObjVeicoli = JSON.parse(sessionStorage.getItem("veicoli"));
        }

        for (var i = 0; i < arrayObjVeicoli.length; i++) {

            if (arrayObjVeicoli[i].id == id) {
            }
        }
}
//////////////////////////////FUNZIONE ACCORDION//////////////////////////////////