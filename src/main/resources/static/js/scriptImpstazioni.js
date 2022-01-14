//Se entra admin
if(JSON.parse(localStorage.getItem("tokenLogin")).ruolo == "amministratore")
{

  $('#modalecancella').remove();
  $('#tastocestino').remove();


}


//Nascondi tasto Input
$('#image').hide();


//Tasto Carica Immagine
function uploadImg() {    

$('#image').click();


};


//Se carichi un immagine
$('#image').on('change', function() {

    var nuvoladoro = '<button type="submit" class="btn btn-primary" id="caricaImg" onclick="uploadImg()"><lottie-player src="https://assets3.lottiefiles.com/packages/lf20_1x60z1np.json"  background="transparent"  speed="1"  style="height: 50px;"  loop  autoplay></lottie-player>'
    
    if (document.getElementById("image").files[0] == null) { 
        
    
        var nuvolaverde =  '<button type="submit" class="btn btn-primary" id="caricaImg" onclick="uploadImg()"><lottie-player src="https://assets5.lottiefiles.com/private_files/lf30_otnc954i.json"  background="transparent"  speed="1" style="height: 50px;"  loop  autoplay></lottie-player>Carica immagine</button>'
        
        $("#nuvola").html(nuvolaverde);
    
    }

    else {

    var nomeFile = document.getElementById("image").files[0].name    

    nuvoladoro += nomeFile +'</button>'    

    $("#nuvola").html(nuvoladoro);

    }

});



//Scarica i Dati per compilarli in pagina
var emailut = JSON.parse(localStorage.getItem("tokenLogin")).email    

var linkRisorsaImpostazioni = "http://localhost:9010/sharing/api/utenti/" + emailut

fetch(linkRisorsaImpostazioni)
  .then(dati => {
    return dati.json()
  })
  .then(res => {

    $("#emailimpoup").html(res.email);

    $("#pwdimpo").attr("placeholder",res.password)
    $("#pwdimpo").attr("value",res.password)

    $("#nomeimpodown").attr("placeholder",res.nome)
    $("#nomeimpodown").attr("value",res.nome)

    $("#cognomeimpodown").attr("placeholder",res.cognome)
    $("#cognomeimpodown").attr("value",res.cognome)

    $("#nascitaimpodown").attr("value",res.nascita.split("-").reverse().join("-"))

    $("#patimpo").attr("placeholder",res.patente)
    $("#patimpo").attr("value",res.patente)
    
    $("#nomeimpo").html(res.nome)
    $("#cognomeimpo").html(res.cognome)
    $("#nascitaimpo").html(res.nascita)
    $("#patenteimpo").html(res.patente)
   
   if(res.fotoProfilo != null){ 

    $("#imgutnimpo").attr("src", res.fotoProfilo)

   }

  })




 //Salva modifiche dell'utente
 function postUtente(e) {




  if(JSON.parse(localStorage.getItem("tokenLogin")).ruolo == "amministratore")
  {
  
    var ruolo = "amministratore"
    
  
  }

  if(JSON.parse(localStorage.getItem("tokenLogin")).ruolo == "utente")
  {
  
    var ruolo = "utente"
    
  
  }
    



const email = document.getElementById("emailimpoup").textContent;

const pwd = document.getElementById("pwdimpo").value;
const nascita = document.getElementById("nascitaimpodown").value;
const pat = document.getElementById("patimpo").value;
const nome = document.getElementById("nomeimpodown").value;
const cognome = document.getElementById("cognomeimpodown").value;


const immagineprof = document.getElementById("imgutnimpo").getAttribute("src");
var src = "";


    //Impostare il form date 
    var today = new Date();
    var vecchio = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear() - 18;
    var yyyr = today.getFullYear() - 18;
    var oldy = yyyy - 120;


    today = yyyy + '-' + mm + '-' + dd;
    todayreal = yyyr + '-' + mm + '-' + dd;
    vecchio = oldy + '-' + mm + '-' + dd;
    document.getElementById("nascitaimpodown").setAttribute("max", today);
    document.getElementById("nascitaimpodown").setAttribute("min", vecchio);





$(".error").remove();

if (nome.length < 1) {
  $('#nomeimpodown').after('<span class="error">Inserisci un nome</span>');
  e.preventDefault();

}

if (nome.length > 40) {
  $('#nomeimpodown').after('<span class="error">Troppi caratteri massimo 40</span>');
  e.preventDefault();

}

if (cognome.length < 1) {
  $('#cognomeimpodown').after('<span class="error">Inserisci un cognome</span>');
  e.preventDefault();

}

if (cognome.length > 40) {
  $('#cognomeimpodown').after('<span class="error">Troppi caratteri massimo 40</span>');
  e.preventDefault();

}

if (nascita > todayreal) {
  $('#nascitaimpodown').after('<span class="error">Vieni dal futuro, non hai niente da fare qui</span>');
  e.preventDefault();

}

if (nascita > document.getElementById("nascitaimpodown").max) {
  $('#nascitaimpodown').after('<span class="error">Non sei maggiorenne</span>');
  e.preventDefault();
}


if (nascita < document.getElementById("nascitaimpodown").min) {
  $('#nascitaimpodown').after('<span class="error">Sei già morto</span>');
  e.preventDefault();

}


if (nascita.length == "") {
    $('#nascitaimpodown').after('<span class="error">Inserisci una data di nascita</span>');
  e.preventDefault();

}


if (pwd.length < 1) {
  $('#pwdimpo').after('<span class="error">Inserisci una password</span>');
  e.preventDefault();

}

if (pwd.length > 30) {
  $('#pwdimpo').after('<span class="error">Troppi caratteri massimo 30</span>');
  e.preventDefault();

}

if (pat.length != 10) {
  $('#patimpo').after('<span class="error">Inserisci un codice valido per la patente</span>');
  e.preventDefault();

}



if (document.getElementById("image").files[0] == null) { 
        
          

        if(immagineprof != null){src = immagineprof}
        
        else {src = "img/utenti/default.png" }
       
    
    }  else {

        const image = document.getElementById("image").files[0];
        const nomeFile = image.name
        src = "img/utenti/" + nomeFile

    }



// oggetto per invio multipart file e altri parametri	
//Creo l'oggetto utente
function costruttore() {
        this.email = email;
        this.password = pwd;
        this.ruolo = ruolo;
        this.nome = nome;
        this.cognome = cognome
        this.nascita = nascita.split("-").reverse().join("-");
        this.patente = pat;
        this.fotoProfilo = src;
      }



                        localStorage.removeItem('tokenLogin')
                        
                    function costruttorefoto() {
                            
                            this.email = email;
                            this.nome = nome;
                            this.ruolo = ruolo;
                            this.fotoProfilo = src;
                        
                        }

                        var token_utente1 = new costruttorefoto();

                        var token_uJson1 = JSON.stringify(token_utente1);

                        localStorage.setItem('tokenLogin', token_uJson1);
      



      var utente = new costruttore();



      var utenteJSON = JSON.stringify(utente);

     

const URL = "http://localhost:9010/sharing/api/utenti";

fetch(URL, {
    headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: utenteJSON
    })
    .then(utente => {
        
        
        const URLIMG = "http://localhost:9010/sharing/api/utenti/foto"
                        
                        var formData = new FormData();
                        
                        formData.append("image", document.getElementById("image").files[0]);
                        
                        fetch(URLIMG, {
                            
                            method: 'POST',
                            body: formData
                        })
                        .then(utente => {
                            
                            location.reload();
                            

                        
                        });               
       
    });






} 
 





 //Cancella account
 $('#eliminaInfo').click(function (e) {

e.preventDefault();

var emailut = JSON.parse(localStorage.getItem("tokenLogin")).email    
var linkRisorsaImpostazioni = "http://localhost:9010/sharing/api/utenti/" + emailut    





 fetch(linkRisorsaImpostazioni, {
 method: 'DELETE',
})

.then(esciSubito => {

    localStorage.removeItem('tokenLogin');
    window.location.assign("http://localhost:9010/sharing/index.html");



})

});


function openModalLogin() {

  $('#modalecancella').modal('toggle');
  
}