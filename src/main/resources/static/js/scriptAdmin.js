///////////////////////FUNZIONE INSERIMENTO VEICOLO NEL DB///////////////////////////   
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

	const URL = "http://localhost:9010/sharing/api/veicoli";

	fetch(URL, {
		method: 'POST',
		body: formData
	})
	// svuoto elementi input veicolo
	.then(veicolo => {
		document.getElementById("nomeVe").value = "";
		document.getElementById("categoria").value = "";
		document.getElementById("autonom").value = "";
		document.getElementById("staz").value = "";
		let blob = document.getElementById("image");
		blob.value = "";
	});
}
///////////////////////FUNZIONE INSERIMENTO VEICOLO NEL DB///////////////////////////


///////////////////CONTROLLO FORM INSERIMENTO VEICOLIO/////////////////////////
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
            autonom: "Inserisci l'autonomia del veicolo",
            staz: 'Inserisci la stazione di appartenenza'
        },
        errorElement: "span",
        submitHandler: function (form) {
            form.submit();
        }
    });
});
///////////////////CONTROLLO FORM INSERIMENTO VEICOLIO/////////////////////////


//////////////////////////////FUNZIONE ACCORDION//////////////////////////////////
var listaVeicoli = document.getElementById("accordionExample");
var linkRisorsa = "http://localhost:9010/sharing/api/veicoli";

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
            listaVeicoli.innerHTML +='<div class="accordion-item">' +
            '<h2 class="accordion-header" id="heading'+ i +'">' +
            '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+ i +'" aria-expanded="false" aria-controls="collapse'+ i +'">' + nome + '</button>' +
            '</h2>' +
            '<div id="collapse' + i + '" class="accordion-collapse collapse" aria-labelledby="heading' + i + '" data-bs-parent="#accordionExample">' +
            '<div class="accordion-body">' +
            '<p>' + autonomia + '</p>' +
            '<p>' + posiz + '</p>' +
            '<div class="d-flex mb-3">' + 
            '<button type="button" class="btn btn-danger btnicon me-2"><i class="fa fa-trash"></i></button>' + 
            '<button type="button" class="btn btn-primary btnicon me-2"><i class="far fa-edit"></i></button>' + 
            '<select class="form-select"><option>opzione1</option></select>' + 
            '</div>' +
            '<img src="' + img + '">' +
            '</div>' +
            '</div>' + 
            '</div>';
        }
    })
//////////////////////////////FUNZIONE ACCORDION//////////////////////////////////
