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

        console.log(setTipo);

});


//stampo nella pagina la lista dei bottoni per filtrare i veicoli
function addFilterBtns(setTipo) {

    var divBtnFilter = document.getElementById("btnContainer");

    setTipo.forEach(function (tipo) {

    console.log(tipo);

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
            case "autoBenzina_Diesel":
                nomeBtn = "Auto Benzina/Diesel";
                break;
        }
console.log(nomeBtn);
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
            case "autoBenzina_Diesel":
                tipoVeicolo = "Auto Benzina/Diesel";
                break;
        }

        var idVeicolo = arrayObjVeicoli[i].id;
        var cancId = "btnCancella-" + idVeicolo;
        var modifId = "btnModifica-" + idVeicolo;

        listaVeicoli.innerHTML += '<div id="accordion-' + idVeicolo + '" class="accordion-item">' +
            '<h2 class="accordion-header" id="heading' + i + '">' +
            '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' + i + '" aria-expanded="false" aria-controls="collapse' + i + '">Veicolo n. 00' + idVeicolo + " - " + nome + '</button>' +
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
            '<div class="d-flex justify-content-between align-items-center mb-3">' +
            '<button type="button" id="' + modifId + '" class="btn btn-primary me-2 bnl-lg" onclick="modificaDati(' + idVeicolo + ')"><i class="fas fa-edit"></i> Modifica</button>' +
            '<button type="button" id="' + cancId + '" class="btn btn-danger bnl-lg" onclick="conferma(' + idVeicolo + ')"><i class="fas fa-trash-alt"></i> Elimina</button>' +
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
                    case "autoBenzina_Diesel":
                        tipoVeicolo = "Auto Benzina/Diesel";
                        break;
                }

                var idVeicolo = arrayObjVeicoli[i].id;
                var cancId = "btnCancella-" + idVeicolo;
                var modifId = "btnModifica-" + idVeicolo;

                listaVeicoli.innerHTML += '<div id="accordion-' + idVeicolo + '" class="accordion-item">' +
                    '<h2 class="accordion-header" id="heading' + i + '">' +
                    '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' + i + '" aria-expanded="false" aria-controls="collapse' + i + '">Veicolo n. 00' + idVeicolo + " - " + nome + '</button>' +
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
                    '<div class="d-flex justify-content-between align-items-center mb-3">' +
                    '<button type="button" id="' + modifId + '" class="btn btn-primary bnl-lg" onclick="modificaDati(' + idVeicolo + ')"><i class="fas fa-edit"></i> Modifica</button>' +
                    '<button type="button" id="' + cancId + '" class="btn btn-danger bnl-lg" onclick="conferma(' + idVeicolo + ')"><i class="fas fa-trash-alt"></i> Elimina</button>' +
                    '</div>' +
                    '<img src="' + img + '">' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }
        }
    }
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
                '<option></option>' +
                '<option value="autoElettrica">Auto Elettrica</option>' +
                '<option value="autoIbrida">Auto Ibrida</option>' +
                '<option value="autoBenzina_Diesel">Auto Diesel/Benzina</option>' +
                '<option value="monopattino">Monopattino</option>' +
                '<option value="bicicletta">Bicicletta</option>' +
                '</select>' +
                '<label for="tipo">Seleziona la categoria</label>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col-md-6">' +
                '<div class="form-floating mb-3">' +
                '<input class="form-control" id="newNome-' + id + '" type="text" placeholder="NISSAN Leaf e+ N-Connecta" aria-label="default input example" name="nomeAuto">' +
                '<label for="nomeAuto">Nome</label>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-6">' +
                '<div class="form-floating mb-3">' +
                '<input class="form-control" id="newModello-' + id + '" type="text" placeholder="berlina 3/5 porte" aria-label="default input example" name="modello">' +
                '<label for="modello">Modello</label>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col-md-6">' +
                '<div class="form-floating mb-3" >' +
                '<input class="form-control" id="newCapacita-' + id + '" type="text" placeholder="62 kWh" aria-label="default input example" name="capacita" >' +
                '<label for="capacita">Capacita</label>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-6">' +
                '<div class="form-floating mb-3">' +
                '<input class="form-control" id="newPotenza-' + id + '" type="text" placeholder="90kW (122 CV)" aria-label="default input example" name="potenza" >' +
                '<label for="potenza">Potenza</label>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="row" >' +
                '<div class="col-md-6">' +
                '<div class="form-floating mb-3">' +
                '<input class="form-control" id="newVelocita-' + id + '" type="text" placeholder="157km/h" aria-label="default input example" name="velocita" >' +
                '<label for="velocita">Velocita massima</label>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-6">' +
                '<div class = "form-floating mb-3">' +
                '<input class="form-control" id="newAutonomia-' + id + '" type="text" placeholder="385km" aria-label="default input example" name="autonomia">' +
                '<label for="autonomia">Autonomia</label>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="form-floating mb-3">' +
                '<textarea class="form-control" id="newDescrizione-' + id + '" placeholder="Inserisci una descrizione del veicolo" name="descrizione" style="height: 100px"></textarea>' +
                '<label for="descrizione">Descrizione</label>' +
                '</div>' +
                '<div class="form-floating mb-3">' +
                '<select class="form-select" aria-label=".form-select-lg example" name="posizione" id="newPosizione-' + id + '">' +
                '<option></option>' +
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
                '<input class="form-check-input" type="checkbox" name="disponibile" id="newDisponibile-' + id + '" checked>' +
                '<label class="form-check-label" for="disponibile">Disponibile al noleggio</label>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-6">' +
                '<div class="form-check form-switch">' +
                '<input class="form-check-input" type="checkbox" name="banner" id="newBanner-' + id + '">' +
                '<label class="form-check-label" for="banner">Immagine visibile in Home</label>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="my-4">' +
                `<label for="image" class="form-label"> Carica l'immagine del veicolo</label>` +
                '<input type="file" class="form-control" name="image" id="newImage-' + id + '" accept="image/svg, image/png, image/jpeg" class="btn btn-secondary" />' +
                '</div>' +
                '<div class="d-flex justify-content-between align-items-center mb-5">' +
                '<button type="button" class="btn btn-success bnl-lg" onclick="putVeicolo(' + id + ')"><i class="fas fa-check"></i> Salva modifiche</button>' +
                '<button type="button" class="btn btn-primary btn-lg" onclick="table(' + id + ')"><i class="fas fa-undo"></i> Annulla</button>' +
                '</div>';

            var oldTipo = arrayObjVeicoli[i].tipo;
            var tipoValues = ["autoElettrica", "autoIbrida", "monopattino", "bicicletta", "autoBenzina_Diesel"];
            var tipi = ["autoElettrica", "autoIbrida", "monopattino", "bicicletta", "autoBenzina_Diesel"];
            setSelected(oldTipo, "#newTipo-" + id, tipoValues, tipi);

            var oldNome = arrayObjVeicoli[i].nome;
            $("#newNome-" + id).attr("value", oldNome);

            var oldModello = arrayObjVeicoli[i].modello;
            $("#newModello-" + id).attr("value", oldModello);

            var oldCapacita = arrayObjVeicoli[i].capacita;
            $("#newCapacita-" + id).attr("value", oldCapacita);

            var oldPotenza = arrayObjVeicoli[i].potenza;
            $("#newPotenza-" + id).attr("value", oldPotenza);

            var oldVelocita = arrayObjVeicoli[i].velocitaMassima;
            $("#newVelocita-" + id).attr("value", oldVelocita);

            var oldAutonomia = arrayObjVeicoli[i].autonomia;
            $("#newAutonomia-" + id).attr("value", oldAutonomia);

            var oldDescrizione = arrayObjVeicoli[i].descrizione;
            $("#newDescrizione-" + id).val(oldDescrizione);

            var oldPosizione = arrayObjVeicoli[i].posizioneAttuale.descrizione;
            var posizioneValues = ["stazione1", "stazione2", "stazione3", "stazione4"];
            var posizioneDesc = ["STAZIONE 1 - Corso Stati Uniti 1", "STAZIONE 2 - Corso Inghilterra 47", "STAZIONE 3 - Via Giudeppe Verdi 61", "STAZIONE 4 - Corso Regio Parco 12"];
            setSelected(oldPosizione, "#newPosizione-" + id, posizioneValues, posizioneDesc);

            var oldDisponibile = arrayObjVeicoli[i].disponibile;
            if (oldDisponibile == "true") {
                $("#newDisponibile-" + id).attr("checked", true);
            } else {
                $("#newDisponibile-" + id).attr("checked", false);
            }
            var oldBanner = arrayObjVeicoli[i].vistaBanner;
            if (oldBanner == "true") {
                $("#newBanner-" + id).attr("checked", true);
            } else {
                $("#newBanner-" + id).attr("checked", false);
            }

            var oldImage = arrayObjVeicoli[i].immagine;
            $("#newImage-" + id).attr("name", oldImage);
        }
    }
}

//funzione per selezionare il valore della option che corrisponde al valore del veicolo nel DB
function setSelected(old, id, optionValues, oldDesc) {
    for (var i = 0; i < optionValues.length; i++) {
        if (old.indexOf(oldDesc[i]) != -1) {
            $(id).children('option[value="' + optionValues[i] + '"]').attr('selected', true);
        }
    }
}

//funzione per ripristinare la tabella dei dati del veicolo
function table(id) {

    arrayObjVeicoli = [];
    if (Modernizr.sessionstorage) {
        arrayObjVeicoli = JSON.parse(sessionStorage.getItem("veicoli"));
    }

    for (var i = 0; i < arrayObjVeicoli.length; i++) {

        if (arrayObjVeicoli[i].id == id) {

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
                case "autoBenzina_Diesel":
                    tipoVeicolo = "Auto Benzina/Diesel";
                    break;
            }

            var idVeicolo = arrayObjVeicoli[i].id;
            var cancId = "btnCancella-" + idVeicolo;
            var modifId = "btnModifica-" + idVeicolo;

            document.getElementById("dettagliVeicolo-" + id).innerHTML = '';

            document.getElementById("dettagliVeicolo-" + id).innerHTML =
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
                '<div class="d-flex justify-content-between align-items-center mb-3">' +
                '<button type="button" id="' + modifId + '" class="btn btn-primary bnl-lg" onclick="modificaDati(' + idVeicolo + ')"><i class="fas fa-edit"></i> Modifica</button>' +
                '<button type="button" id="' + cancId + '" class="btn btn-danger bnl-lg" onclick="conferma(' + idVeicolo + ')"><i class="fas fa-trash-alt"></i> Elimina</button>' +
                '</div>' +
                '<img src="' + img + '">';
        }

    }
}

//funzione per fare un update dei dati del veicolo in DB
function putVeicolo(id) {

    var URL = "http://localhost:9010/sharing/api/veicoli";
    const formData = new FormData();

    //cancello gli span di errore quando rientro nella funzione
    $(".error").remove();

    //controllo i campi del form
    const tipo = document.getElementById("newTipo-" + id).value;
    if (tipo == "") {
        $('#newTipo-' + id).after(`<span class="error">Seleziona la tipologia del veicolo</span>`);
        id.preventDefault();
    }

    const nome = document.getElementById("newNome-" + id).value;
    if (nome == "") {
        $("#newNome-" + id).after(`<span class="error">Inserisci il nome del veicolo</span>`);
        id.preventDefault();
    }
    if (nome.length < 4) {
        $("#newNome-" + id).after(`<span class="error">Il nome del veicolo è troppo corto</span>`);
        id.preventDefault();
    }
    if (nome.length > 50) {
        $("#newNome-" + id).after(`<span class="error">Il nome del veicolo è troppo lungo</span>`);
        id.preventDefault();
    }

    const modello = document.getElementById("newModello-" + id).value;
    if (modello == "") {
        $("#newModello-" + id).after(`<span class="error">Inserisci il modello del veicolo</span>`);
        id.preventDefault();
    }
    if (modello.length < 3) {
        $("#newModello-" + id).after(`<span class="error">Il modello del veicolo è troppo corto</span>`);
        id.preventDefault();
    }
    if (modello.length > 25) {
        $("#newModello-" + id).after(`<span class="error">Il modello del veicolo è troppo lungo</span>`);
        id.preventDefault();
    }

    const capacita = document.getElementById("newCapacita-" + id).value;
    if (capacita == "") {
        $("#newCapacita-" + id).after(`<span class="error">Inserisci la capacita del veicolo</span>`);
        id.preventDefault();
    }
    if (capacita.length < 3) {
        $("#newCapacita-" + id).after(`<span class="error">La capacita del veicolo è troppo corta</span>`);
        id.preventDefault();
    }
    if (capacita.length > 15) {
        $("#newCapacita-" + id).after(`<span class="error">La capacita del veicolo è troppo lunga</span>`);
        id.preventDefault();
    }

    const potenza = document.getElementById("newPotenza-" + id).value;
    if (potenza == "") {
        $("#newPotenza-" + id).after(`<span class="error">Inserisci la potenza del veicolo</span>`);
        id.preventDefault();
    }
    if (potenza.length < 3) {
        $("#newPotenza-" + id).after(`<span class="error">La potenza del veicolo è troppo corta</span>`);
        id.preventDefault();
    }
    if (potenza.length > 15) {
        $("#newPotenza-" + id).after(`<span class="error">La potenza del veicolo è troppo lunga</span>`);
        id.preventDefault();
    }

    const velocita = document.getElementById("newVelocita-" + id).value;
    if (velocita == "") {
        $("#newVelocita-" + id).after(`<span class="error">Inserisci la velocita del veicolo</span>`);
        id.preventDefault();
    }
    if (velocita.length < 3) {
        $("#newVelocita-" + id).after(`<span class="error">La velocita del veicolo è troppo corta</span>`);
        id.preventDefault();
    }
    if (velocita.length > 15) {
        $("#newVelocita-" + id).after(`<span class="error">La velocita del veicolo è troppo lunga</span>`);
        id.preventDefault();
    }

    const autonomia = document.getElementById("newAutonomia-" + id).value;
    if (autonomia == "") {
        $("#newAutonomia-" + id).after(`<span class="error">Inserisci l'autonomia del veicolo</span>`);
        id.preventDefault();
    }
    if (autonomia.length < 3) {
        $("#newAutonomia-" + id).after(`<span class="error">L'autonomia del veicolo è troppo corta</span>`);
        id.preventDefault();
    }
    if (autonomia.length > 15) {
        $("#newAutonomia-" + id).after(`<span class="error">L'autonomia del veicolo è troppo lunga</span>`);
        id.preventDefault();
    }
    const descrizione = document.getElementById("newDescrizione-" + id).value;
    if (descrizione == "") {
        $("#newDescrizione-" + id).after(`<span class="error">Inserisci la descrizione del veicolo</span>`);
        id.preventDefault();
    }
    if (descrizione.length < 15) {
        $("#newDescrizione-" + id).after(`<span class="error">La descrizione del veicolo è troppo corta</span>`);
        id.preventDefault();
    }
    if (descrizione.length > 250) {
        $("#newDescrizione-" + id).after(`<span class="error">La descrizione del veicolo è troppo lunga</span>`);
        id.preventDefault();
    }

    const inputPosizione = document.getElementById("newPosizione-" + id).value;
    if (inputPosizione == "") {
        $("#newPosizione-" + id).after(`<span class="error">Inserisci la posizione attuale del veicolo</span>`);
        id.preventDefault();
    }

    const disponibile = document.getElementById("newDisponibile-" + id).checked;
    const banner = document.getElementById("newBanner-" + id).checked;

    var image = "";
    var nomeFile = "";
    var src = "";

    if (document.getElementById("newImage-" + id).files.length > 0) {
        image = document.getElementById("newImage-" + id).files[0];
        nomeFile = image.name;
        src = "img/" + tipo + "/" + nomeFile;
        URL = "http://localhost:9010/sharing/api/veicoli/file";
        formData.append("immagine", src);
        formData.append("image", image);
    } else {
        formData.append("immagine", document.getElementById("newImage-" + id).name); //@TODO set old values
    }


    var posizione;
    switch (inputPosizione) {
        case "stazione1":
            posizione = {
                "descrizione": "STAZIONE 1 - Corso Stati Uniti 1",
                "latitudine": 45.0625658,
                "longitudine": 7.6696263
            };
            break;
        case "stazione2":
            posizione = {
                "descrizione": "STAZIONE 2 - Corso Inghilterra 47",
                "latitudine": 45.0754338,
                "longitudine": 7.6650673
            };
            break;
        case "stazione3":
            posizione = {
                "descrizione": "STAZIONE 3 - Via Giudeppe Verdi 61",
                "latitudine": 45.0665578,
                "longitudine": 7.6972264
            };
            break;
        case "stazione4":
            posizione = {
                "descrizione": "STAZIONE 4 - Corso Regio Parco 12",
                "latitudine": 45.0753703,
                "longitudine": 7.6912162
            };
            break;
    }

    formData.append("id", id);
    formData.append("nome", nome);
    formData.append("tipo", tipo);
    formData.append("modello", modello);
    formData.append("capacita", capacita);
    formData.append("potenza", potenza);
    formData.append("velocitaMassima", velocita);
    formData.append("autonomia", autonomia);
    formData.append("descrizione", descrizione);
    formData.append("posizioneAttuale", JSON.stringify(posizione));
    formData.append("disponibile", disponibile);
    formData.append("vistaBanner", banner);

    fetch(URL, {
            method: 'PUT',
            body: formData
        })
        .then(() => {
            successo()
        });
}

//funzione per aprire il modale che mi notifica il successo dell'operazione
function successo() {

    $('#successoModifica').modal('toggle');

}

//funzione per prendere l'id del veicolo da eliminare e metterlo in storage
//apre modale per chiedere conferma dell'operazione
function conferma(id) {

    if (Modernizr.sessionstorage) {
        sessionStorage.setItem("idVeicolo", id);
    }

    $('#cancellaVeicolo').modal('toggle');

}

//funzione per eliminare il veicolo dal catalogo (quindi dal DB)
function eliminaDati() {

    var id;
    if (Modernizr.sessionstorage) {
        id = sessionStorage.getItem("idVeicolo");
    }

    const URL = "http://localhost:9010/sharing/api/veicoli/id/" + id;
    fetch(URL, {
            method: 'DELETE'
        })
        .then(() => {
            $('#cancellaVeicolo').modal('hide')
            successo();
        });

}

//funzione che ricarica la pagina corrente
function ricaricaPagina() {
    location.reload();
}

//funzione button che mi fa tornare in home
$('#vaiHome').click(function () {
    window.location = "index.html";
});
//////////////////////////////FUNZIONE ACCORDION//////////////////////////////////