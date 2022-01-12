////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
//Tab Prenotazioni in corso


var emailut = JSON.parse(localStorage.getItem("tokenLogin")).email  

var divprenotazioniincorso = document.getElementById("prntcorso")

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
                  
                          '<div class="col-sm-12 col-md-6 align-self-center">' +
                  
                      ' <h2 class="pacific">' + res[j].nome + '</h2>'+

                          '<div class="d-flex">'+
                          '<h5 class="me-2">Data di inizio prenotazione: </h5>'+
                          '  <p>' + inizioPrn + '</p>' + 
                          '</div>'+


                          '<hr class="my-4" />'+

                          '<div class="d-flex justify-content-evenly">'+

                          
                          '<button type="button" class="btn btn-primary" onclick="cambiaVeicolo('+ inizioCambiaV + ',' + idVeicolo + ',' + idPrn +')">Cambia Veicolo</button>'+

                         

                          '<button type="button" class="btn btn-info" onclick="cambiaData('+ idVeicolo + ',' + idPrn +')">Cambia Data</button>'+
                         
                      

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
function cambiaData(veicolo, id){


    console.log("cambia data" + id)


}

///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
function cambiaVeicolo(data, veicolo, id){



  console.log("cambia veicolo" + id)


}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////