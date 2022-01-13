/////////////////SE TROVI QUESTO TOKEN REINDIRIZZA A VEICOLI DISPO (SERVE PER CAMBIA VEICOLO)
if(localStorage.getItem('cambiaprenotaz')){

  location.href = "veicoli-disponibili.html";

}


////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
//Tab Prenotazioni in corso


var emailut = JSON.parse(localStorage.getItem("tokenLogin")).email  

var divprenotazioniincorso = document.getElementById("prntcorso")

var divprenotazionifinite = document.getElementById("prntfinite")

var linkprenotazioni = "http://localhost:9010/sharing/api/prenotazioni/email/" + emailut


//////////////////////////////
//Recupero i dati delle prenotazioni

fetch(linkprenotazioni)
  .then(dati => {
    return dati.json()
  })
  .then(res => {

/////Se non ci sono dati ovvero non hai mai fatto nessuna prenotazione

      if(res.length == 0) {


        $('#tabsticky').remove()
        $('#prntfinite').remove()


        divprenotazioniincorso.innerHTML += 

        '<div class="container align-middle">'+
          '<h1 class="text-center" style="margin-top: 0%;">Non hai mai fatto prenotazioni!</h1>'+
          '<h3 class="text-center" style="margin-top: 0%;">Cosa aspetti?</h3>'+
          '<div class="text-center">'+
              '<a class="btn btn-primary text-center" href="veicoli-disponibili.html">Prenota un veicolo</a>'+
          '</div>'+
          '<lottie-player  src="https://assets1.lottiefiles.com/packages/lf20_kqfglvmb.json"  background="transparent"  speed="1"  style="width: 50%; margin: 0 auto;"  loop  autoplay ></lottie-player>'+
      '</div>';

      }


/////Se ci sono dati    
else {


    var listaveicoli1 = []
    
    
    for(var i=0; i < res.length; i++) {



      if (res[i].stato == "in corso") {


        function veicolosingolo() {
          
          
          this.id = res[i].veicoloId

          this.inizioprn =  res[i].inizioPrenotazione

          this.idprn = res[i].id
        
        
        }
        
        var veicolosingular = new veicolosingolo()
        
        
        listaveicoli1.push(veicolosingular)


        }






        }

        var apiveicoli = "http://localhost:9010/sharing/api/veicoli"


////Recupero i dati dei veicoli
fetch(apiveicoli)
.then(data => {
  return data.json()
})
.then(res => {


    for(var j=0; j<res.length; j++) {


            for (var k=0; k<listaveicoli1.length; k++){
              
              
                  if(res[j].id == listaveicoli1[k].id){


                    var idVeicolo = listaveicoli1[k].id
                    var idPrn = listaveicoli1[k].idprn
                    var inizioPrn = listaveicoli1[k].inizioprn.substring(0, 10).split("-").reverse().join("-")
                    var inizioCambiaV = listaveicoli1[k].inizioprn
                    

    
                    
                    divprenotazioniincorso.innerHTML += 
                      '<div class="row sezione">' + 
                        '<div class="col-sm-12 col-md-6">' +
                      '    <img class="immaginina" src="' +  res[j].immagine    +'">'+
                      '</div>'+
                  
                          '<div class="col-sm-12 col-md-6 align-self-center" >' +
                  
                      ' <h2 class="pacific">' + res[j].nome + '</h2>'+

                          '<div class="flex-column">'+
                          '<h5 class="me-2">Data di inizio prenotazione: </h5>'+
                          '  <p id="aggiungicalendario'+ k  +'">' + inizioPrn + '</p>' + 
                          '</div>'+


                          '<hr class="my-4" />'+

                          '<div class="d-flex justify-content-evenly">'+

                          
                          '<button type="button" class="btn btn-primary" id="cambiaveicolobtnid'+ k +'" dammidata="'+ inizioCambiaV +'" onclick="cambiaVeicolo('+ idVeicolo + ',' + idPrn  + ', this.id )">Cambia Veicolo</button>'+


                          '<button type="button" class="btn btn-info" id="cambiaredatabtnid'+ k +'" dammicalendario="aggiungicalendario'+ k +'" onclick="cambiaData('+ idVeicolo + ',' + idPrn + ', this.id)">Cambia Data</button>'+
                         
                      

                          '<button type="button" class="btn btn-danger" onclick="chiudiPrenotazione('+ idVeicolo + ',' + idPrn +')">Chiudi Prenotazione</button>'+

                          '</div>' +

                          '</div>';

                          


                  } 


              }

           

              

  }      




  if (divprenotazioniincorso.childNodes.length == 0){

    divprenotazioniincorso.innerHTML += 

        '<div class="container align-middle">'+
          '<h1 class="text-center" style="margin-top: 0%;">Non ci sono prenotazioni attive!</h1>'+
          '<h3 class="text-center" style="margin-top: 0%;">Cosa aspetti?</h3>'+
          '<div class="text-center">'+
              '<a class="btn btn-primary text-center" href="veicoli-disponibili.html">Prenota un veicolo</a>'+
          '</div>'+
          '<lottie-player  src="https://assets1.lottiefiles.com/datafiles/HN7OcWNnoqje6iXIiZdWzKxvLIbfeCGTmvXmEm1h/data.json"  background="transparent"  speed="1"  style="width: 50%; margin: 0 auto;"  loop  autoplay ></lottie-player>'+
      '</div>';

          }


  });


  }
        
  })


  







////////////////////////////////////////////////////////////
function chiudiPrenotazione(veicolo, id){
//////////////////////////////////////////////////////////
//Cambia stato veicolo in disponibile



var linkveicolosingola = "http://localhost:9010/sharing/api/veicoli/id/" + veicolo

   

      fetch(linkveicolosingola)
      .then(dati => {
        return dati.json()
      })
      .then(res => {


        linkApiAddV = "http://localhost:9010/sharing/api/veicoli"



        function costruttoreveicolo(){
          this.id = res.id;
          this.nome = res.nome;
          this.tipo = res.tipo;
          this.modello = res.modello;
          this.capacita = res.capacita;
          this.potenza = res.potenza;
          this.velocitaMassima = res.velocitaMassima
          this.autonomia = res.autonomia
          this.descrizione = res.descrizione
          this.posizioneAttuale = res.posizioneAttuale
          this.disponibile = "true"
          this.vistaBanner = res.vistaBanner
          this.immagine = res.immagine


        }

        var veicolo = new costruttoreveicolo();

        
        var veicoloJSON = JSON.stringify(veicolo);
        



        fetch(linkApiAddV, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "PUT",
          body: veicoloJSON
        })
                 

                
              

        })


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Cambia DB Prenotazioni


    var linkprenotazionesingola = "http://localhost:9010/sharing/api/prenotazioni/id/" + id

   

      fetch(linkprenotazionesingola)
      .then(dati => {
        return dati.json()
      })
      .then(res => {


        linkApiAdd = "http://localhost:9010/sharing/api/prenotazioni"



        function costruttoreprenotazione(){
          this.id = res.id;
          this.utenteEmail = res.utenteEmail;
          this.veicoloId = res.veicoloId;
          this.tipo = res.tipo;
          this.stato = res.stato;
          this.inizioPrenotazione = res.inizioPrenotazione
          this.finePrenotazione = res.finePrenotazione
        }

        var prenotazione = new costruttoreprenotazione();



        var prenotazioneJSON = JSON.stringify(prenotazione);



        fetch(linkApiAdd, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "PUT",
          body: prenotazioneJSON
        })
        .then(prenotazioneconclusa => {
                            
          
          
          location.reload();
          

      
            });               

                
              

        })

}

////////////////////////////////////////////////////////////////////////////////////////////
function cambiaData(veicolo, id, calendario){


    var cale = calendario 

    var calen = $("#"+cale).attr("dammicalendario")

    
    var calendariovero = 
   
    '<form id="formPrenotazione'+ calendario +'">'+
                   
    '<div class="form-group col">'+
        '<input type="datetime-local" id="dataOraPrenotazione'+ calendario +'"'+
            'class="form-control mt-3 ms-3" name="dataOraPrenotazione'+ calendario +'">'+
        '</div>'+
    '</form>';
                    
                    
                       
     $(calendariovero).insertAfter('#'+calen)


    var date = new Date();
    var gg = date.getDate();
    if (gg < 10) {
        gg = "0" + gg;
    }
    var mo = date.getMonth() + 1;
    if (mo < 10) {
        mo = "0" + mo;
    }
    var yyyy = date.getFullYear();
    var hh = date.getHours();
    var mi = date.getMinutes();
    var today = yyyy + "-" + mo + "-" + gg + "T" + hh + ":" + mi;
    var maxDate = (yyyy + 1) + "-" + mo + "-" + gg + "T" + hh + ":" + mi;

    $('#dataOraPrenotazione'+ calendario).attr("min", today);
    $('#dataOraPrenotazione'+ calendario).attr("max", maxDate);

    $('#formPrenotazione' + calendario).validate({
        rules: {
            dataOraPrenotazione: {
                required: true,
                date: true
            }
        },
        messages: {
            dataOraPrenotazione: "Devi inserire un valore valido di tipo data e ora"
        },
        errorElement: "span",
        submitHandler: function () {


        }
    });


    $("#"+cale).attr("class", "btn btn-success")

    $("#"+cale).html("Salva data")


    $("#"+cale).attr("onclick", "saveDate("+ veicolo +","+ id + ", this.id )")

    var formprenotazionedaeliminare = 'formPrenotazione' + calendario

    var htmlButtonAnnulla = 
    
    '<button type="button" class="btn btn-warning" id="annullacalendario'+ calendario +'" onclick="annullaData('+ formprenotazionedaeliminare + ',' +  veicolo + ',' + id +  ',' + calendario +', this.id )">Annulla</button>';
    
    $(htmlButtonAnnulla).insertAfter('#' + cale);

}

function saveDate(veicolo,id,calendario){


    //prendo email dallo Storage
    var emailStorage;

    if (Modernizr.localstorage) {

        var utenteStorage = JSON.parse(localStorage.getItem("tokenLogin"));
        console.log(utenteStorage);
        emailStorage = utenteStorage.email;

    }

    //prendo id veicolo dalla storage
    var idVeicoloStorage = veicolo;
    console.log(idVeicoloStorage);

    var idcalendarioperfavore = calendario
    console.log(idcalendarioperfavore)

    dataOraInput = $('#dataOraPrenotazione'+ calendario ).val();
    console.log(dataOraInput);

    var objPrenotazione = {
        utenteEmail: emailStorage,
        veicoloId: idVeicoloStorage,
        inizioPrenotazione: dataOraInput
    }
    console.log(objPrenotazione);

    const URLprenotazione = "http://localhost:9010/sharing/api/prenotazioni";

    //salvo i dati su tabella prenotazioni nel DB con POST su api/prenotazioni
    fetch(URLprenotazione, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(objPrenotazione)
    });


    //DeletePrenotazione

    const URLprenotazioneDEL = "http://localhost:9010/sharing/api/prenotazioni/id/" + id

    fetch(URLprenotazioneDEL, {
      method: 'DELETE',
     })
     .then(ricarica => {

      
        location.reload();
  
  
  })

}


function annullaData(form, veicolo, id, calendario, bottonelimina) {
 
  
  var formelimina = $(form).attr('id');

  
 var calendario1 = $(calendario).attr('id');



  $('#'+ bottonelimina).remove()


  $('#'+ formelimina).remove()


  $("#"+calendario1).attr("class", "btn btn-info")
  $("#"+calendario1).html("Cambia Data")
  
  $('#'+ calendario1).attr("onclick",  "cambiaData(" + veicolo + "," + id + ", this.id )")

  


}




///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
function cambiaVeicolo(veicolo, id, data){


  var identificativobottone = data

  var datafiera = $("#"+identificativobottone).attr("dammidata")
  

  
  function costruttorepercambiare(){

      this.data = datafiera

  }

      var token_percambiare = new costruttorepercambiare();

      var token_percambiareJson = JSON.stringify(token_percambiare);

      localStorage.setItem('cambiaprenotaz', token_percambiareJson);


      chiudiPrenotazione(veicolo, id);

  // var emailStorage;

  //   if (Modernizr.localstorage) {

  //     var utenteStorage = JSON.parse(localStorage.getItem("tokenLogin"));
  //     emailStorage = utenteStorage.email;

  // }

  // var objPrenotazione = {
  //     utenteEmail: emailStorage,
  //     veicoloId: veicolo,
  //     inizioPrenotazione: data
  // }


  // const URLprenotazione = "http://localhost:9010/sharing/api/prenotazioni";

  // //salvo i dati su tabella prenotazioni nel DB con POST su api/prenotazioni
  // fetch(URLprenotazione, {
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //     },
  //     method: "POST",
  //     body: JSON.stringify(objPrenotazione)
  // });


}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////