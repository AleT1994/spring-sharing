//Cosa succede quando viene caricata la pagina
window.onload = (event) => {

  //Login automatico dopo registrazione
  if (localStorage.getItem('autenticazione')) {

    $("#login").click();

    document.getElementById("email").value = JSON.parse(localStorage.getItem('autenticazione')).email
    document.getElementById("pwd").value = JSON.parse(localStorage.getItem('autenticazione')).password

    localStorage.removeItem('autenticazione');

    $("#accedi").click();
  }

  //Se sei già loggato
  if (localStorage.getItem('tokenLogin')) {

    //Toglie login e modale
    $("#login").remove();
    $("#myModal").remove();


    //Da il Benvenuto
    var benvenuto = JSON.parse(localStorage.getItem('tokenLogin'))
    var nome = benvenuto.nome
    var ruolo = benvenuto.ruolo

    //Se c'è l'admin permetti di vedere il pannello admin
    if (ruolo == "amministratore") {

      var stringaAdmin = '<li class="nav-item dropdown" id="pannelloAdmin"><a style="text-align: center;" class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Azioni Admin</a><ul class="dropdown-menu" aria-labelledby="navbarDropdown"><li><a style="text-align: center;" class="dropdown-item" href="InserimentoVeicoli.html">Inserisci Veicolo</a></li><li><a style="text-align: center;" class="dropdown-item" href="TabellaVeicoliMK1.html">Gestisci Veicoli</a></li></ul></li>'

      //Inserisce il pannello admin dopo la lista dei veicoli disponibili
      $(stringaAdmin).insertAfter("#veicolidispo");

    }


    var stringaBenvenuto = '<li class="nav-item dropdown" id="benvenutoUtente"><a style="text-align: center;" class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Benvenuto ' + nome + '</a><ul class="dropdown-menu" aria-labelledby="navbarDropdown"><li><a style="text-align: center;" class="dropdown-item" href="#">Le tue Prenotazioni</a></li><li class="text-center"><button  onclick="loggingOut()" class="btn btn-danger" id="logout">Log Out</button></li></ul></li>'


    $("#loginPadre").html(stringaBenvenuto);


    ///Se non sei loggato
  } else {

    //Se hai messo la spunta ricordami ripesca il token e mettili nel form
    if (localStorage.getItem('ricordamiLogin')) {
      document.getElementById("email").value = JSON.parse(localStorage.getItem('ricordamiLogin')).email
      document.getElementById("pwd").value = JSON.parse(localStorage.getItem('ricordamiLogin')).password

    }


  }

};

//Login
$('#login-form').submit(function (e) {

  e.preventDefault();

  var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var email = document.getElementById("email").value
  var psw = document.getElementById("pwd").value

  //Validazione Login_Form
  $(".error").remove();

  if (email.length < 1) {
    $('#email').after('<span class="error">Non hai inserito la mail</span>');
  }

  if (!email.match(regEx)) {
    $('#email').after('<span class="error">Inserisci una mail valida!</span>');
  }

  if (psw.length < 1) {
    $('#pwd').after('<span class="error">Inserisci una password</span>');
  }

  if ((email.length > 0) && (psw.length > 0) && (email.match(regEx))) {

    linkRisorsa = "http://localhost:9077/sharing/api/utenti/"
    linkRisorsa += email;

    //Controlla su db i dati se sono giusti
    fetch(linkRisorsa)
      .then(dati => {
        return dati.json()
      })
      .then(res => {
        if ((res.email == email) && (res.password == psw)) {

          //Creo il token per mantenere il login anche se ricarico la pagina
          function costruttore() {
            this.nome = res.nome;
            this.ruolo = res.ruolo;
          }

          var token_utente = new costruttore();

          var token_uJson = JSON.stringify(token_utente);

          localStorage.setItem('tokenLogin', token_uJson);

          //Se il check su ricordarmi è presente creo un token per auto-compilare il form di login per le volte successive
          if ($('#ricordamiDati').is(':checked')) {


            var token_memoria = "";

            function ricordami() {
              this.email = res.email;
              this.password = res.password;
            }

            token_memoria = new ricordami();

            var token_mJson = JSON.stringify(token_memoria);

            localStorage.setItem('ricordamiLogin', token_mJson);


          }

          location.reload();

          //Autenticazione fallita
        } else {

          $(".error").remove();

          $('#accedi').after('<span class="error">Autenticazione fallita: email o password sbagliati!</span>');


        }

      })

  }

});

//Logout Funzione
function loggingOut() {
  localStorage.removeItem('tokenLogin');
  location.reload();
}

//Registrazione Form
function registration() {

  $('#myModal').modal('toggle');

  //Impostare il form date mettendo come Massimo la data odierna
  var today = new Date();
  var vecchio = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear() - 18;
  var oldy = yyyy - 100;


  today = yyyy + '-' + mm + '-' + dd;
  vecchio = oldy + '-' + mm + '-' + dd;
  document.getElementById("nascita").setAttribute("max", today);
  document.getElementById("nascita").setAttribute("min", vecchio);



  //Registrazione
  $('#registration-form').submit(function (e) {

    e.preventDefault();

    var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var nome = document.getElementById("nome").value
    var cognome = document.getElementById("cognome").value
    var nascita = document.getElementById("nascita").value
    var email = document.getElementById("email1").value
    var psw = document.getElementById("pwd1").value



    //Validazione Reg_Form
    $(".error").remove();


    if (nome.length < 1) {
      $('#nome').after('<span class="error">Inserisci un nome</span>');
    }

    if (nome.length > 40) {
      $('#nome').after('<span class="error">Troppi caratteri massimo 40</span>');
    }

    if (cognome.length < 1) {
      $('#cognome').after('<span class="error">Inserisci un cognome</span>');
    }

    if (cognome.length > 40) {
      $('#cognome').after('<span class="error">Troppi caratteri massimo 40</span>');
    }

    if (nascita.length < 1) {
      $('#nascita').after('<span class="error">Inserisci una data di nascita</span>');
    }

    if (email.length < 1) {
      $('#email1').after('<span class="error">Non hai inserito la mail</span>');
    }

    if (email.length > 30) {
      $('#email1').after('<span class="error">Troppi caratteri massimo 30</span>');
    }

    if (!email.match(regEx)) {
      $('#email1').after('<span class="error">Inserisci una mail valida!</span>');
    }

    if (psw.length < 1) {
      $('#pwd1').after('<span class="error">Inserisci una password</span>');
    }

    if (psw.length > 30) {
      $('#pwd1').after('<span class="error">Troppi caratteri massimo 30</span>');
    }


    //Controllo se la mail esiste già
    linkRisorsa = "http://localhost:9077/sharing/api/utenti/"
    linkRisorsa += email;

    //Controlla su db i dati se sono giusti
    fetch(linkRisorsa)
      .then(dati => {
        return dati.json()
      })
      .then(res => {

        if (res.email == email) {

          $('#email1').after('<span class="error">Mail già registrata per un account!</span>');

        }

      })
      .catch(emailgood => {

        if ((30 >= email.length > 0) && (30 >= psw.length > 0) && (email.match(regEx)) && (40 >= nome.length > 0) && (40 >= cognome.length > 0)) {

          linkApiAdd = "http://localhost:9077/sharing/api/utenti"

          //Creo l'oggetto utente
          function costruttore() {
            this.email = email;
            this.password = psw;
            this.ruolo = "utente";
            this.nome = nome;
            this.cognome = cognome
            this.nascita = nascita.split("-").reverse().join("-");
          }

          var utente = new costruttore();

          var utenteJSON = JSON.stringify(utente);


          fetch(linkApiAdd, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: utenteJSON
          })




          var token_memoria = "";

          function ricordami() {
            this.email = email;
            this.password = psw;
          }

          token_memoria = new ricordami();

          var token_meJson = JSON.stringify(token_memoria);

          localStorage.setItem('autenticazione', token_meJson);

          location.reload()

        }


      })
  });
}

function openModalLogin() {
  $('#myModal').modal('toggle');
}