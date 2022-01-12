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

        divBtnFilter.innerHTML += '<button class="btn me-1" id="btn-' + tipo + '" >' + nomeBtn + '</button>';
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
        var modello = arrayObjVeicoli[i].modello;
        var capacita = arrayObjVeicoli[i].capacita;
        var potenza = arrayObjVeicoli[i].potenza;
        var velocita = arrayObjVeicoli[i].velocitaMassima;
        var autonomia = arrayObjVeicoli[i].autonomia;
        var descrizione = arrayObjVeicoli[i].descrizione;
        var posizione = arrayObjVeicoli[i].posizioneAttuale.descrizione;
        var disponibile = arrayObjVeicoli[i].disponibile;
        var banner = arrayObjVeicoli[i].vistaBanner;
        var img = arrayObjVeicoli[i].immagine;

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
            '<table class="table">' +
            '<tbody>' +
            '<tr>' + '<th>Tipologia</th><td id="tipo-' + idVeicolo + '">' + tipoVeicolo + '</td></tr>' +
            '<tr>' + '<th>Modello</th><td id="modello-' + idVeicolo + '">' + modello + '</td></tr>' +
            '<tr>' + '<th>Capacità</th><td id="capacita-' + idVeicolo + '"">' + capacita + '</td></tr>' +
            '<tr>' + '<th>Potenza</th><td id="potenza-' + idVeicolo + '">' + potenza + '</td></tr>' +
            '<tr>' + '<th>Velocità massima</th><td id="velocita-' + idVeicolo + '">' + velocita + '</td></tr>' +
            '<tr>' + '<th>Autonomia</th><td id="autonomia-' + idVeicolo + '">' + autonomia + '</td></tr>' +
            '<tr>' + '<th>Descrizione</th><td id="descrizione-' + idVeicolo + '">' + descrizione + '</td></tr>' +
            '<tr>' + '<th>Posizione attuale</th><td id="posizione-' + idVeicolo + '">' + posizione + '</td></tr>' +
            '<tr>' + '<th>Attualmente disponibile</th><td id="disponibile-' + idVeicolo + '">' + disponibile + '</td></tr>' +
            '<tr>' + '<th>Visibile in Home</th><td id="banner-' + idVeicolo + '">' + banner + '</td></tr>' +
            ' </tbody>' +
            '</table>' +
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
                var modello = arrayObjVeicoli[i].modello;
                var capacita = arrayObjVeicoli[i].capacita;
                var potenza = arrayObjVeicoli[i].potenza;
                var velocita = arrayObjVeicoli[i].velocitaMassima;
                var autonomia = arrayObjVeicoli[i].autonomia;
                var descrizione = arrayObjVeicoli[i].descrizione;
                var posizione = arrayObjVeicoli[i].posizioneAttuale.descrizione;
                var disponibile = arrayObjVeicoli[i].disponibile;
                var banner = arrayObjVeicoli[i].vistaBanner;
                var img = arrayObjVeicoli[i].immagine;

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
                    '<table class="table">' +
                    '<tbody>' +
                    '<tr>' + '<th>Categoria</th><td>' + tipoVeicolo + '</td></tr>' +
                    '<tr>' + '<th>Modello</th><td>' + modello + '</td></tr>' +
                    '<tr>' + '<th>Capacità</th><td>' + capacita + '</td></tr>' +
                    '<tr>' + '<th>Potenza</th><td>' + potenza + '</td></tr>' +
                    '<tr>' + '<th>Velocità massima</th><td>' + velocita + '</td></tr>' +
                    '<tr>' + '<th>Autonomia</th><td>' + autonomia + '</td></tr>' +
                    '<tr>' + '<th>Descrizione</th><td>' + descrizione + '</td></tr>' +
                    '<tr>' + '<th>Stazione di appartentenza</th><td>' + posizione + '</td></tr>' +
                    '<tr>' + '<th>Attualmente disponibile</th><td>' + disponibile + '</td></tr>' +
                    '<tr>' + '<th>Visibile in Home</th><td>' + banner + '</td></tr>' +
                    ' </tbody>' +
                    '</table>' +
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


//funzione per eliminare il veicolo dal catalogo (ovvero dal DB)
function eliminaDati(id) {

    const URL = "http://localhost:9010/sharing/api/veicoli/id/" + id;
    fetch(URL, {
            method: 'DELETE'
        })
        .then(() => {
            //nascondo momentaneamente l'accordion del viecolo (ricaricando la pagina non ci sara più tra i dati in Storage)
            document.getElementById("accordion-" + id).innerHTML = '';
            showMessage('<div class="alert alert-success" role="alert">La tua azione è andata a buon fine</div>');
            setTimeout(hideMessage, 5000);
        });

}

function showMessage(message) {
    document.getElementById("apiMessage").innerHTML = message;
}

function hideMessage() {
    document.getElementById("apiMessage").innerHTML = '';
}


//funzione per modificare le informazioni del veicolo
function modificaDati(id) {

    arrayObjVeicoli = [];
    if (Modernizr.sessionstorage) {
        arrayObjVeicoli = JSON.parse(sessionStorage.getItem("veicoli"));
    }

    for (var i = 0; i < arrayObjVeicoli.length; i++) {

        if (arrayObjVeicoli[i].id == id) {

            console.log(arrayObjVeicoli[id]);
            console.log(JSON.stringify(arrayObjVeicoli[id].posizioneAttuale));

            document.getElementById("posizione-" + id).innerHTML = '';
            document.getElementById("posizione-" + id).innerHTML = '<select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" id="newPosizione-' + id + '" required>' +
                `<option value='stazione1'>STAZIONE 1 - Corso Stati Uniti 1</option>` +
                `<option value='stazione2'>STAZIONE 2 - Corso Inghilterra 47</option>` +
                `<option value='stazione3'>STAZIONE 3 - Via Giudeppe Verdi 61</option>` +
                `<option value='stazione4'>STAZIONE 4 - Corso Regio Parco 12</option>` +
                '</select>';

                
                var options = document.getElementById('newPosizione-' + id).childNodes;
                console.log(options);

                switch (arrayObjVeicoli[i].posizone) {
                    case {"descrizione": "STAZIONE 1 - Corso Stati Uniti 1", "latitudine": 45.0625658, "longitudine": 7.6696263 }:
                        $("#newPosizione-" + id).val("stazione1").attr("selected", true);
                        break;
                    case {"descrizione": "STAZIONE 2 - Corso Inghilterra 47", "latitudine": 45.0754338, "longitudine": 7.6650673}:
                        $("#newPosizione-" + id).val("stazione2").attr("selected", true);
                        break;
                    case {"descrizione": "STAZIONE 3 - Via Giudeppe Verdi 61", "latitudine": 45.0665578, "longitudine": 7.6972264}:
                        $("#newPosizione-" + id).val("stazione3").attr("selected", true);
                        break;
                    case {"descrizione": "STAZIONE 4 - Corso Regio Parco 12", "latitudine": 45.0753703, "longitudine": 7.6912162}:
                        $("#newPosizione-" + id).val("stazione4").attr("selected", true);
                        break;
                }
                for(var i = 0; i < arrayObjVeicoli.length; i++)
                if ($("#newPosizione-" + id).val() == JSON.stringify(arrayObjVeicoli[id].posizioneAttuale)) {
                    $("#newPosizione-" + id).attr("selected", true);
                }
        }
    }
}
//////////////////////////////FUNZIONE ACCORDION//////////////////////////////////