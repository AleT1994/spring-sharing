////////////////////////////////////////////////////
//////Impedire prenotazione ai non loggati






///////////////////////////////////////////
var url = 'http://localhost:4200/sharing/api/veicoli/disponibile/true'

var divveico = document.getElementById("veicolidisposez");

fetch(url)
  .then(response => {return response.json()})
  .then(data => {

    var numeropaginate = Math.ceil((data.length)/10)


    if(numeropaginate < 2)
    
    {
    
      $('.tastierapag').remove();

      for(var i=0; i < data.length; i++) {

        var tastoId = "btnPrenota-" + i;
        var correzionetipo = data[i].tipo

        if (correzionetipo == "autoElettrica"){ correzionetipo = "Auto Elettrica"}
        if (correzionetipo == "autoIbrida"){ correzionetipo = "Auto Ibrida"}
        if (correzionetipo == "autoBenzina_Diesel"){ correzionetipo = "Auto Benzina/Diesel"}
        if (correzionetipo == "monopattino"){ correzionetipo = "Monopattino"}
        if (correzionetipo == "bicicletta"){ correzionetipo = "Bicicletta"}



        divveico.innerHTML +=

        '<div class="row sezione">' + 
        '<div class="col-sm-12 col-md-6">' +
        '    <img class="immaginina" src="' +  data[i].immagine    +'">'+
        '</div>'+
        
        '<div class="col-sm-12 col-md-6">' +
        
        ' <h2 class="pacific">' + data[i].nome + '</h2>'+
        
        '<div class="d-flex">'+
        '<h5 class="me-2">Tipologia: </h5>'+
        '  <p>' + correzionetipo + '</p>' + 
        '</div>'+

        '<div class="d-flex">'+
        '<h5 class="me-2">Modello: </h5>'+
        '  <p>' + data[i].modello + '</p>' + 
        '</div>'+

        '<div class="d-flex">'+
        '<h5 class="me-2">Capacità: </h5>'+
        '  <p>' + data[i].capacita + '</p>' + 
        '</div>'+

        '<div class="d-flex">'+
        '<h5 class="me-2">Potenza: </h5>'+
        '  <p>' + data[i].potenza + '</p>' + 
        '</div>'+
        
        '<div class="d-flex">'+
        '<h5 class="me-2">Velocità Massima: </h5>'+
        '  <p>' + data[i].velocitaMassima + '</p>' + 
        '</div>'+


        '<div class="d-flex">'+
        '<h5 class="me-2">Autonomia: </h5>'+
        '  <p>' + data[i].autonomia + '</p>' + 
        '</div>'+


        '<div class="d-flex">'+
        '<h5 class="me-2">Posizione Attuale: </h5>'+
        '  <p>' + data[i].posizioneAttuale.descrizione + '</p>' + 
        '</div>'+
        
        '<button type="button" id="' + tastoId + '" class="btn btn-success" onclick="getDati(' + i + ')">Prenota</button>' +
        '</a>' +
        '</div>' +
        '</div>';

        
        //collego a ogni bottone "Prenota" i dati della sua auto sotto forma di Stringa (con attributo obj)
        var btnPrenota = document.getElementById(tastoId);
        var stringifiedObj = JSON.stringify(data[i]);
        btnPrenota.setAttribute("obj", stringifiedObj);



      }



    
    
    } 
    
    else {

            //Riempo prima pagina
            //(C'è un bug, al momento lo aggiro così)


            var bugnpagend = 10
            var bugnpagstart = 0

            for(bugnpagstart; bugnpagstart < bugnpagend; bugnpagstart++) {

              var tastoId = "btnPrenota-" + bugnpagstart;
              var correzionetipo = data[bugnpagstart].tipo
      
              if (correzionetipo == "autoElettrica"){ correzionetipo = "Auto Elettrica"}
              if (correzionetipo == "autoIbrida"){ correzionetipo = "Auto Ibrida"}
              if (correzionetipo == "autoBenzina_Diesel"){ correzionetipo = "Auto Benzina/Diesel"}
              if (correzionetipo == "monopattino"){ correzionetipo = "Monopattino"}
              if (correzionetipo == "bicicletta"){ correzionetipo = "Bicicletta"}
      
      
      
              divveico.innerHTML +=
      
              '<div class="row sezione">' + 
              '<div class="col-sm-12 col-md-6">' +
              '    <img class="immaginina" src="' +  data[bugnpagstart].immagine    +'">'+
              '</div>'+
              
              '<div class="col-sm-12 col-md-6">' +
              
              ' <h2 class="pacific">' + data[bugnpagstart].nome + '</h2>'+
              
              '<div class="d-flex">'+
              '<h5 class="me-2">Tipologia: </h5>'+
              '  <p>' + correzionetipo + '</p>' + 
              '</div>'+
      
              '<div class="d-flex">'+
              '<h5 class="me-2">Modello: </h5>'+
              '  <p>' + data[bugnpagstart].modello + '</p>' + 
              '</div>'+
      
              '<div class="d-flex">'+
              '<h5 class="me-2">Capacità: </h5>'+
              '  <p>' + data[bugnpagstart].capacita + '</p>' + 
              '</div>'+
      
              '<div class="d-flex">'+
              '<h5 class="me-2">Potenza: </h5>'+
              '  <p>' + data[bugnpagstart].potenza + '</p>' + 
              '</div>'+
              
              '<div class="d-flex">'+
              '<h5 class="me-2">Velocità Massima: </h5>'+
              '  <p>' + data[bugnpagstart].velocitaMassima + '</p>' + 
              '</div>'+
      
      
              '<div class="d-flex">'+
              '<h5 class="me-2">Autonomia: </h5>'+
              '  <p>' + data[bugnpagstart].autonomia + '</p>' + 
              '</div>'+
      
      
              '<div class="d-flex">'+
              '<h5 class="me-2">Posizione Attuale: </h5>'+
              '  <p>' + data[bugnpagstart].posizioneAttuale.descrizione + '</p>' + 
              '</div>'+
              
              '<button type="button" id="' + tastoId + '" class="btn btn-primary" onclick="getDati(' + bugnpagstart + ')">Prenota</button>' +
              '</a>' +
              '</div>' +
              '</div>';
      
              
              //collego a ogni bottone "Prenota" i dati della sua auto sotto forma di Stringa (con attributo obj)
              var btnPrenota = document.getElementById(tastoId);
              var stringifiedObj = JSON.stringify(data[bugnpagstart]);
              btnPrenota.setAttribute("obj", stringifiedObj);
      


            }


        
            //Bootpag
                $('.tastierapag').bootpag({
                  total: numeropaginate,
                  page: 1,
                  maxVisible: 5,
                  leaps: true,
                  firstLastUse: true,
                  first: '←',
                  last: '→',
                  wrapClass: 'pagination',
                  activeClass: 'active',
                  disabledClass: 'disabled',
                  nextClass: 'next',
                  prevClass: 'prev',
                  lastClass: 'last',
                  firstClass: 'first'
                }).on("page", function(event, num){

                  

                  divveico.innerHTML = ""

                  var elementinpagend = (num)*10
                  var elementinpagstart = ((num)*10)-10

                  if(data.length < elementinpagend){

                    elementinpagend = data.length;

                  }

                        for(elementinpagstart; elementinpagstart < elementinpagend; elementinpagstart++) {

                          var tastoId = "btnPrenota-" + elementinpagstart;
                          var correzionetipo = data[elementinpagstart].tipo
                  
                          if (correzionetipo == "autoElettrica"){ correzionetipo = "Auto Elettrica"}
                          if (correzionetipo == "autoIbrida"){ correzionetipo = "Auto Ibrida"}
                          if (correzionetipo == "autoBenzina_Diesel"){ correzionetipo = "Auto Benzina/Diesel"}
                          if (correzionetipo == "monopattino"){ correzionetipo = "Monopattino"}
                          if (correzionetipo == "bicicletta"){ correzionetipo = "Bicicletta"}
                  
                  
                  
                          divveico.innerHTML +=
                  
                          '<div class="row sezione">' + 
                          '<div class="col-sm-12 col-md-6">' +
                          '    <img class="immaginina" src="' +  data[elementinpagstart].immagine    +'">'+
                          '</div>'+
                          
                          '<div class="col-sm-12 col-md-6">' +
                          
                          ' <h2 class="pacific">' + data[elementinpagstart].nome + '</h2>'+
                          
                          '<div class="d-flex">'+
                          '<h5 class="me-2">Tipologia: </h5>'+
                          '  <p>' + correzionetipo + '</p>' + 
                          '</div>'+
                  
                          '<div class="d-flex">'+
                          '<h5 class="me-2">Modello: </h5>'+
                          '  <p>' + data[elementinpagstart].modello + '</p>' + 
                          '</div>'+
                  
                          '<div class="d-flex">'+
                          '<h5 class="me-2">Capacità: </h5>'+
                          '  <p>' + data[elementinpagstart].capacita + '</p>' + 
                          '</div>'+
                  
                          '<div class="d-flex">'+
                          '<h5 class="me-2">Potenza: </h5>'+
                          '  <p>' + data[elementinpagstart].potenza + '</p>' + 
                          '</div>'+
                          
                          '<div class="d-flex">'+
                          '<h5 class="me-2">Velocità Massima: </h5>'+
                          '  <p>' + data[elementinpagstart].velocitaMassima + '</p>' + 
                          '</div>'+
                  
                  
                          '<div class="d-flex">'+
                          '<h5 class="me-2">Autonomia: </h5>'+
                          '  <p>' + data[elementinpagstart].autonomia + '</p>' + 
                          '</div>'+
                  
                  
                          '<div class="d-flex">'+
                          '<h5 class="me-2">Posizione Attuale: </h5>'+
                          '  <p>' + data[elementinpagstart].posizioneAttuale.descrizione + '</p>' + 
                          '</div>'+
                          
                          '<button type="button" id="' + tastoId + '" class="btn btn-primary" onclick="getDati(' + elementinpagstart + ')">Prenota</button>' +

                          '</div>' +
                          '</div>';
                  
                          
                          //collego a ogni bottone "Prenota" i dati della sua auto sotto forma di Stringa (con attributo obj)
                          var btnPrenota = document.getElementById(tastoId);
                          var stringifiedObj = JSON.stringify(data[elementinpagstart]);
                          btnPrenota.setAttribute("obj", stringifiedObj);
                  
                          $(window).scrollTop()

                        }

                        

                }); 


                $('.tastierapag li').addClass("page-item")
                $('.tastierapag a').addClass("page-link")
                $('.bootpag').attr("style", "margin:0 auto; margin-bottom: 2%")
                


    }





  } );




///////////////////////FUNZIONE PULSANTE PRENOTA///////////////////////////

//funzione per recuperare la stringa dei dati dell'auto e salvarla in sessione
function getDati(id) {

  if (localStorage.getItem('tokenLogin')) {

    var tastoId = "btnPrenota-" + id;
    var objVeicolo = JSON.parse(document.getElementById(tastoId).getAttribute("obj"));
    if (Modernizr.sessionstorage) {
        sessionStorage.setItem("datiVeicolo", JSON.stringify(objVeicolo));
    }


    if(localStorage.getItem('cambiaprenotaz')){
      
      var emailStorage;

    if (Modernizr.localstorage) {

        var utenteStorage = JSON.parse(localStorage.getItem("tokenLogin"));
        console.log(utenteStorage);
        emailStorage = utenteStorage.email;

    }

    //prendo id veicolo dalla storage
    var idVeicoloStorage = objVeicolo.id;
    console.log(idVeicoloStorage);

    dataOraInput = JSON.parse(localStorage.getItem('cambiaprenotaz')).data;
    console.log(dataOraInput);

    var objPrenotazione = {
        utenteEmail: emailStorage,
        veicoloId: idVeicoloStorage,
        inizioPrenotazione: dataOraInput
    }
    console.log(objPrenotazione);

    const URLprenotazione = "http://localhost:4200/sharing/api/prenotazioni";

    //salvo i dati su tabella prenotazioni nel DB con POST su api/prenotazioni
    fetch(URLprenotazione, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(objPrenotazione)
    });
    

    localStorage.removeItem('cambiaprenotaz')
    
    location.href = "prenotazioni-utente.html"
    
    
    
  }
  
  
  
    else {location.href = "prenota-veicolo.html"}
    
  } else { $('#myModal').modal('toggle');}

}
///////////////////////FUNZIONE PULSANTE PRENOTA///////////////////////////





