//////////////////////////////FUNZIONE ACCORDION//////////////////////////////////

$().ready(function () {

    var arrayVeicoli = [];
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

                var tipoVeicolo;
                switch (res[i].tipo) {
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

                //salvo un set dei tipi di veicoli per i bottoni di filtraggio
                setTipo.add(tipoVeicolo);

            }

            //salvo la lista dei veicoli in SessionStorage per poterli filtrare per tipo
            if (Modernizr.sessionstorage) {
                sessionStorage.setItem("veicoli", JSON.stringify(arrayVeicoli));
            }

            creaAccordion(setTipo);
        });


        // QUI
});





//funzione per recuperare la lista dei veicoli in catalogo secondo il tipo
function filter(tipo) {
console.log(tipo);

}

function creaAccordion(setTipo){
    //stampo la lista dei bottoni per filtrare i veicoli
    var divBtnFilter = document.getElementById("btnContainer");
   
    setTipo.forEach(function(tipo) {
        console.log(tipo);
        var btnId =tipo.replaceAll(' ','');
        divBtnFilter.innerHTML += '<button class="btn" id="btn-'+btnId+'" >' + tipo + '</button>';
        $('#btn-'+btnId).attr('onClick','filter("'+tipo+'")');
      })
   
    //document.getElementById("btnContainerTipo").innerHTML = "";
   
   
   
    //recupero i dati dalla Session Storage e li salvo in un array
    arrayObjVeicoli = [];
   
    if (Modernizr.sessionstorage) {
        arrayObjVeicoli = JSON.parse(sessionStorage.getItem("veicoli"));
    }
   
    var listaVeicoli = document.getElementById("accordionExample");
   
    for (var i = 0; i < arrayObjVeicoli.length; i++) {
   
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
   
        var cancId = "btnCancella-" + i;
        var modifId = "btnModifica-" + i;
   
        //
        listaVeicoli.innerHTML += '<div class="accordion-item filterDiv ' + arrayObjVeicoli[i].tipo + '">' +
            '<h2 class="accordion-header" id="heading' + i + '">' +
            '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' + i + '" aria-expanded="false" aria-controls="collapse' + i + '">' + nome + '</button>' +
            '</h2>' +
            '<div id="collapse' + i + '" class="accordion-collapse collapse" aria-labelledby="heading' + i + '" data-bs-parent="#accordionExample">' +
            '<div class="accordion-body">' +
            '<p>' + autonomia + '</p>' +
            '<p>' + posiz + '</p>' +
            '<div class="d-flex mb-3">' +
            '<button type="button" id="' + cancId + ' class="btn btn-danger onclick="eliminaDati(' + i + ')"><i class="fa fa-trash"></i></button>' +
            '<button type="button" id="' + modifId + ' class="btn btn-primary onclick="modificaDati(' + i + ')"><i class="far fa-edit"></i></button>' +
            '</div>' +
            '<img src="' + img + '">' +
            '</div>' +
            '</div>' +
            '</div>';
   
   }
}
//////////////////////////////FUNZIONE ACCORDION//////////////////////////////////