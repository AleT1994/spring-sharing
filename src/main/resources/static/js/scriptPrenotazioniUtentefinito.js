
  //Tab Prenotazioni finite
  
  
  var emailut = JSON.parse(localStorage.getItem("tokenLogin")).email  
    
  var divprenotazionifinite = document.getElementById("prntfinite")
  
  var linkprenotazioni = "http://localhost:9010/sharing/api/prenotazioni/email/" + emailut
  
  
  //////////////////////////////
  //Recupero i dati delle prenotazioni
  
  fetch(linkprenotazioni)
    .then(dati => {
      return dati.json()
    })
    .then(res => {
  
  
      var listaveicoli11 = []
      
      for(var i=0; i < res.length; i++) {
  
  
  
          if (res[i].stato == "conclusa") {
  
  
            function veicolosingolo1() {
            
            
              this.id = res[i].veicoloId
    
              this.inizioprn =  res[i].inizioPrenotazione
              
              this.fineprn =  res[i].finePrenotazione
    
              this.idprn = res[i].id
              
            
            
            }
            
            var veicolosingular1 = new veicolosingolo1()
            
            
            listaveicoli11.push(veicolosingular1)
  
  
  
          }
  
  
  
  
          }
  
          var apiveicoli = "http://localhost:9010/sharing/api/veicoli"
  


  ////Recupero i dati dei veicoli
  fetch(apiveicoli)
  .then(data => {
    return data.json()
  })
  .then(res => {
  
  
    for(var t =0 ; t < res.length; t++) {
  
        // console.log($(res[t]).attr('id'))

       for (var y=0; y<listaveicoli11.length; y++){
        


                
                  if($(res[t]).attr('id') == listaveicoli11[y].id){
  
                    var inizioPrn = listaveicoli11[y].inizioprn.substring(0, 10).split("-").reverse().join("-")
                    var finePrn = listaveicoli11[y].fineprn.substring(0, 10).split("-").reverse().join("-")

                    var correzionetipo = res[t].tipo

                    if (correzionetipo == "autoElettrica"){ correzionetipo = "Auto Elettrica"}
                    if (correzionetipo == "autoIbrida"){ correzionetipo = "Auto Ibrida"}
                    if (correzionetipo == "autoBenzina_Diesel"){ correzionetipo = "Auto Benzina/Diesel"}
                    if (correzionetipo == "monopattino"){ correzionetipo = "Monopattino"}
                    if (correzionetipo == "bicicletta"){ correzionetipo = "Bicicletta"}
      
                    
                    divprenotazionifinite.innerHTML += 
                      '<div class="row sezione">' + 
                        '<div class="col-sm-12 col-md-6">' +
                      '    <img class="immaginina" src="' +  res[t].immagine    +'">'+
                      '</div>'+
                  
                          '<div class="col-sm-12 col-md-6 align-self-center" >' +
                  
                      ' <h2 class="pacific">' + res[t].nome + '</h2>'+
                      '  <p>' + correzionetipo + '</p>' + 
  
                          '<div class="flex-column">'+
                          '<h5 class="me-2">Data di inizio prenotazione: </h5>'+
                          '  <p>' + inizioPrn + '</p>' + 
                          '<br>'+
                          '<h5 class="me-2">Data di fine prenotazione: </h5>'+
                          '  <p>' + finePrn + '</p>' + 
                          '</div>'+
  
  
                          '<hr class="my-4" />'+
  
                          '</div>';
  
                          
  
  
                  } 
  
  
              }
  
  
      }
  
  
  
    if (divprenotazionifinite.childNodes.length == 0){
  
        divprenotazionifinite.innerHTML += 
  
          '<div class="container align-middle">'+
            '<h1 class="text-center" style="margin-top: 0%;">Non ci sono prenotazioni concluse!</h1>'+
            '<lottie-player  src="https://assets1.lottiefiles.com/datafiles/HN7OcWNnoqje6iXIiZdWzKxvLIbfeCGTmvXmEm1h/data.json"  background="transparent"  speed="1"  style="width: 50%; margin: 0 auto;"  loop  autoplay ></lottie-player>'+
        '</div>';
  
            }
  
  
    });
  
  
    
          
    })
  
  
    
  
  
  
  
  
  
