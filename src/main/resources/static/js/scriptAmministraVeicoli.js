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
            '<div id="dettagliVeicolo-' + idVeicolo + '" class="accordion-body">' +
            '<table class="table">' +
            '<tbody>' +
            '<tr>' + '<th>Tipologia</th><td>' + tipoVeicolo + '</td></tr>' +
            '<tr>' + '<th>Modello</th><td>' + modello + '</td></tr>' +
            '<tr>' + '<th>Capacità</th><td>' + capacita + '</td></tr>' +
            '<tr>' + '<th>Potenza</th><td>' + potenza + '</td></tr>' +
            '<tr>' + '<th>Velocità massima</th><td>' + velocita + '</td></tr>' +
            '<tr>' + '<th>Autonomia</th><td>' + autonomia + '</td></tr>' +
            '<tr>' + '<th>Descrizione</th><td>' + descrizione + '</td></tr>' +
            '<tr>' + '<th>Posizione attuale</th><td>' + posizione + '</td></tr>' +
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
                    '<div id="dettagliVeicolo-' + idVeicolo + '" class="accordion-body">' +
                    '<table class="table">' +
                    '<tbody>' +
                    '<tr>' + '<th>Tipologia</th><td>' + tipoVeicolo + '</td></tr>' +
                    '<tr>' + '<th>Modello</th><td>' + modello + '</td></tr>' +
                    '<tr>' + '<th>Capacità</th><td>' + capacita + '</td></tr>' +
                    '<tr>' + '<th>Potenza</th><td>' + potenza + '</td></tr>' +
                    '<tr>' + '<th>Velocità massima</th><td>' + velocita + '</td></tr>' +
                    '<tr>' + '<th>Autonomia</th><td>' + autonomia + '</td></tr>' +
                    '<tr>' + '<th>Descrizione</th><td>' + descrizione + '</td></tr>' +
                    '<tr>' + '<th>Posizione attuale</th><td>' + posizione + '</td></tr>' +
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

            document.getElementById("dettagliVeicolo-" + id).innerHTML = '';

            document.getElementById("dettagliVeicolo-" + id).innerHTML =
                '<div class="form-floating mb-3">' +
                '<select class="form-select" aria-label=".form-select-lg example" name="tipo" id="newTipo-' + id + '">' +
                '<option selected></option>' +
                '<option value="autoElettrica">Auto Elettrica</option>' +
                '<option value="autoIbrida">Auto Ibrida</option>' +
                '<option value="monopattino">Monopattino</option>' +
                '<option value="bicicletta">Bicicletta</option>' +
                '<option value="autoBenzina_Diesel">Auto Diesel/Benzina</option>' +
                '</select>' +
                '<label for="tipo">Seleziona la categoria</label>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col-md-6">' +
                '<div class="form-floating mb-3">' +
                '<input class="form-control" id="newNome' + id + '" type="text" placeholder="NISSAN Leaf e+ N-Connecta" aria-label="default input example" name="nomeAuto">' +
                '<label for="nomeAuto">Nome</label>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-6">' +
                '<div class="form-floating mb-3">' +
                '<input class="form-control" id="newModello' + id + '" type="text" placeholder="berlina 3/5 porte" aria-label="default input example" name="modello">' +
                '<label for="modello">Modello</label>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col-md-6">' +
                '<div class="form-floating mb-3" >' +
                '<input class="form-control" id="newCapacita' + id + '" type="text" placeholder="62 kWh" aria-label="default input example" name="capacita" >' +
                '<label for="capacita">Capacita</label>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-6">' +
                '<div class="form-floating mb-3">' +
                '<input class="form-control" id="newPotenza' + id + '" type="text" placeholder="90kW (122 CV)" aria-label="default input example" name="potenza" >' +
                '<label for="potenza">Potenza</label>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="row" >' +
                '<div class="col-md-6">' +
                '<div class="form-floating mb-3">' +
                '<input class="form-control" id="newVelocita' + id + '" type="text" placeholder="157km/h" aria-label="default input example" name="velocita" >' +
                '<label for="velocita">Velocita massima</label>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-6">' +
                '<div class = "form-floating mb-3">' +
                '<input class="form-control" id="newAutonomia' + id + '" type="text" placeholder="385km" aria-label="default input example" name="autonomia">' +
                '<label for="autonomia">Autonomia</label>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="form-floating mb-3">' +
                '<textarea class="form-control" id="newDescrizione' + id + '" placeholder="Inserisci una descrizione del veicolo" name="descrizione" style="height: 100px">' +
                '</textarea>' +
                '<label for="descrizione">Descrizione</label>' +
                '</div>' +
                '<div class="form-floating mb-3">' +
                '<select class="form-select" aria-label=".form-select-lg example" name="posizione" id="newPosizione-' + id + '">' +
                '<option value="stazione1">STAZIONE 1 - Corso Stati Uniti 1</option>' +
                '<option value="stazione2">STAZIONE 2 - Corso Inghilterra 47</option>' +
                '<option value="stazione3">STAZIONE 3 - Via Giudeppe Verdi 61</option>' +
                '<option value="stazione4">STAZIONE 4 - Corso Regio Parco 12</option>' +
                '</select>' +
                '<label for="posizione">Seleziona la posizione attuale</label>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col-md-6">' +
                '<div class="form-check form-switch">' +
                '<input class="form-check-input" type="checkbox" id="disponibile" checked>' +
                '<label class="form-check-label" for="disponibile">Disponibile al noleggio</label>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-6">' +
                '<div class="form-check form-switch">' +
                '<input class="form-check-input" type="checkbox" id="banner">' +
                '<label class="form-check-label" for="banner">Immagine visibile in Home</label>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="my-4">' +
                `<label for="image" class="form-label"> Carica l'immagine del veicolo</label>` +
                '<input type="file" class="form-control" name="image" id="image" accept="image/svg, image/png, image/jpeg" class="btn btn-secondary" />' +
                '</div>' +
                '<div class="d-flex justify-content-center align-items-center mb-5">' +
                '<button class="btn btn-success btn-lg" onclick="postVeicolo()" value="Salva" id="post-image">Salva</button>' +
                '</div>'

            var oldPosizioneSelected = arrayObjVeicoli[i].posizioneAttuale.descrizione;

            var posizioneValues = ["stazione1", "stazione2", "stazione3", "stazione4"];
            var optionDesc = ["STAZIONE 1 - Corso Stati Uniti 1", "STAZIONE 2 - Corso Inghilterra 47", "STAZIONE 3 - Via Giudeppe Verdi 61", "STAZIONE 4 - Corso Regio Parco 12"];

            setChecked(oldPosizioneSelected, "#newPosizione-" + id, posizioneValues, optionDesc);

        }
    }
}

//funzione per selezionare il valore della option che corrisponde al valore del veicolo nel DB
function setChecked(old, id, optionValues, optionTexts) {
    for (var i = 0; i < optionValues.length; i++) {
        if (old.indexOf(optionTexts[i]) != -1) {
            $(id).children('option[value="' + optionValues[i] + '"]').attr('selected', true);
        }
    }
}
//////////////////////////////FUNZIONE ACCORDION//////////////////////////////////