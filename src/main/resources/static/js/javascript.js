var listaVeicoli = document.getElementById("accordionExample");
var linkRisorsa = "http://localhost:9077/sharing/api_veicoli";

var elementoImg;

fetch(linkRisorsa)
    .then(dati => {
        return dati.json()
    })
    .then(res => {
        for (var i = 0; i < res.length; i++) {
            var nome = res[i].nome;
            var img = res[i].immagine;
            var autonomia = res[i].autonomia;
            var posiz = res[i].posizioneAttuale;
            listaVeicoli.innerHTML +='<div class="accordion-item"><h2 class="accordion-header" id="heading'+i+'"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+i+'" aria-expanded="false" aria-controls="collapse'+i+'">'+nome+'</button></h2><div id="collapse'+i+'" class="accordion-collapse collapse" aria-labelledby="heading'+i+'" data-bs-parent="#accordionExample"><div class="accordion-body"><p>'+autonomia+'</p><p>'+posiz+'</p><div class="d-flex mb-3"><button type="button" class="btn btn-danger btnicon me-2"><i class="fa fa-trash"></i></button><button type="button" class="btn btn-primary btnicon me-2"><i class="far fa-edit"></i></button><select class="form-select"><option>opzione1</option></select></div><img src="'+img+'"></div></div></div>';
        }
    })

///////////////////controllo form inserimento veicolo/////////////////////////
$().ready(function () {
    $('#form').validate({
        rules: {
            nomeVe: {
                required: true
            },
            autonom: {
                required: true
            },
            staz: {
                required: true
            }
        },
        messages: {
            nomeVe: 'Inserisci il nome del veicolo',
            autonom: 'Prego, inserire autonomia',
            staz: 'Inserisci stazione di appartenenza'
        },
        errorElement: "span",
        submitHandler: function (form) {
            form.submit();
        }
    });
});
///////////////////controllo form inserimento veicolo/////////////////////////



///////////////////////FUNZIONE INSERIMENTO VEICOLO NEL DB///////////////////////////
//(rendilo parlante, cit alexandra) veicolo dice:"hey ciao, sono un veicolo depresso :("


// var objVeicolo = {};
// objVeicolo.nome = document.getElementById("nomeVe").value;
// objVeicolo.autonomia = document.getElementById("autonom").value;
// objVeicolo.stazione = document.getElementById("staz").value;
// objVeicolo.categoria = document.getElementById("categoria").value;

// var btnAddVehicle = document.getElementById("btnAddVehicle");


// btnAddVehicle.addEventListener("click", () => {
    // $('#form').submit(function (e) {
    //     e.preventDefault();
    //     console.log("hey!");

    //         function costruttoreVeicolo() {
    //             this.nome = document.getElementById("nomeVe").value;
    //             this.tipo = document.getElementById("categoria").value;
    //             this.autonomia = document.getElementById("autonom").value;
    //             this.posizioneAttuale = document.getElementById("staz").value;
    //         }
    //         var objVeicolo = new costruttoreVeicolo();
    //         var objJsonVeicoli = JSON.stringify(objVeicolo);
    //         console.log(objVeicolo);

    //         fetch("http://localhost:9077/sharing/api_veicoli", {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: objJsonVeicoli
    //         })
    //     });


    ////////////////////////////////////////////////////////////////////////////////
    // $('#form').submit(function (e) {
    //     e.preventDefault();
    //     const nome = document.getElementById("nomeVe").value;
	// const tipo = document.getElementById("categoria").value;
	// const autonomia = document.getElementById("autonom").value;
	// const posizioneAttuale = document.getElementById("staz").value;
	// const image = document.getElementById("image").files[0];
	// const nomeFile = image.name
	
	// const src = "img/" + tipo + "/" + nomeFile
	

	// // oggetto per invio multipart file e altri parametri	
	// const formData = new FormData();

	// formData.append("nome", nome);
	// formData.append("tipo", tipo);
	// formData.append("autonomia", autonomia);
	// formData.append("posizioneAttuale", posizioneAttuale);
	// formData.append("immagine", src);
	// formData.append("image", image);


	// const URL = "http://localhost:9077/sharing/api_veicoli";

	// fetch(URL, {
	// 	method: 'POST',
	// 	body: formData
	// })
	// 	//.then(response => {
	// 	//	console.log(response.status);
	// 	//	return response.json()
	// 	//})
	// 	.then(veicolo => {
	// 		document.getElementById("nomeVe").value = "";
	// 		document.getElementById("categoria").value = "";
	// 		document.getElementById("autonom").value = "";
	// 		document.getElementById("staz").value = "";
			
	// 		// svuoto elementi input veicolo
	// 		let blob = document.getElementById("image");
	// 		blob.value = "";
	// 	});
    // })
////////////////////////////////////////////////////////////////////////////////

    
    
    // aggiungi veicolo
    document.getElementById("post-image").addEventListener("click", postVeicolo);
function postVeicolo() {
	const nome = document.getElementById("nomeVe").value;
	const tipo = document.getElementById("categoria").value;
	const autonomia = document.getElementById("autonom").value;
	const posizioneAttuale = document.getElementById("staz").value;
	const image = document.getElementById("image").files[0];
	const nomeFile = image.name
	
	const src = "img/" + tipo + "/" + nomeFile
	

	// oggetto per invio multipart file e altri parametri	
	const formData = new FormData();

	formData.append("nome", nome);
	formData.append("tipo", tipo);
	formData.append("autonomia", autonomia);
	formData.append("posizioneAttuale", posizioneAttuale);
	formData.append("immagine", src);
	formData.append("image", image);


	const URL = "http://localhost:9077/sharing/api_veicoli";

	fetch(URL, {
		method: 'POST',
		body: formData
	})
		//.then(response => {
		//	console.log(response.status);
		//	return response.json()
		//})
		.then(veicolo => {
			document.getElementById("nomeVe").value = "";
			document.getElementById("categoria").value = "";
			document.getElementById("autonom").value = "";
			document.getElementById("staz").value = "";
			
			// svuoto elementi input veicolo
			let blob = document.getElementById("image");
			blob.value = "";
		});

}
        
            ///////////////////////FUNZIONE INSERIMENTO VEICOLO NEL DB///////////////////////////