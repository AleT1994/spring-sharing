let step = document.getElementsByClassName('step');
let prevBtn = document.getElementById('prev-btn');
let nextBtn = document.getElementById('next-btn');
let submitBtn = document.getElementById('submit-btn');
let form = document.getElementsByTagName('form')[0];
let preloader = document.getElementById('preloader-wrapper');
let bodyElement = document.querySelector('body');
let succcessDiv = document.getElementById('success');
var riepilogo = document.getElementById('riepilogo');
var selezioneOfferta = document.getElementById('selezioneOfferta');

form.onsubmit = () => {
    return false
}
let current_step = 0;
let stepCount = 2
step[current_step].classList.add('d-block');
if (current_step == 0) {
    prevBtn.classList.add('d-none');
    submitBtn.classList.add('d-none');
    nextBtn.classList.add('d-inline-block');
}

const progress = (value) => {
    document.getElementsByClassName('progress-bar')[0].style.width = `${value}%`;
}


nextBtn.addEventListener('click', function () {
   
    $(".error").remove();

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


    var propriora = yyyy + "-" + mo + "-" + gg + "T" + hh + ":" + mi;

    if (document.getElementById("dataOraPrenotazione").value == "") {
    $('#dataOraPrenotazione').after('<span class="error">Devi inserire un valore valido di tipo data e ora</span>');
    return
    }

    /*else if (document.getElementById("dataOraPrenotazione").value > document.getElementById("dataOraPrenotazione").max) {
    $('#dataOraPrenotazione').after('<span class="error">Puoi prenotare il veicolo entro massimo 1 anno</span>');
    return
    }
    else if (document.getElementById("dataOraPrenotazione").value < propriora ) {
    $('#dataOraPrenotazione').after('<span class="error">Non puoi prenotare qualcosa nel passato</span>');
    return
    }*/

    else {
   
    current_step++;
    console.log(current_step);
    let previous_step = current_step - 1;
    if ((current_step > 0) && (current_step <= stepCount)) {
        prevBtn.classList.remove('d-none');
        prevBtn.classList.add('d-inline-block');
        step[current_step].classList.remove('d-none');
        step[current_step].classList.add('d-block');
        step[previous_step].classList.remove('d-block');
        step[previous_step].classList.add('d-none');
        if (current_step == stepCount) {
            submitBtn.classList.remove('d-none');
            submitBtn.classList.add('d-inline-block');
            nextBtn.classList.remove('d-inline-block');
            nextBtn.classList.add('d-none');
        }
    } else {
        if (current_step > stepCount) {
            form.onsubmit = () => {
                return true
            }
        }
    }
    progress((100 / stepCount) * current_step);


    if(current_step==2){
        riepilogo.innerHTML=selezioneOfferta.value;
    }




        }

});
 

 
prevBtn.addEventListener('click', () => {


    if (current_step > 0) {
        current_step--;
        console.log(current_step);
        let previous_step = current_step + 1;
        prevBtn.classList.add('d-none');
        prevBtn.classList.add('d-inline-block');
        step[current_step].classList.remove('d-none');
        step[current_step].classList.add('d-block')
        step[previous_step].classList.remove('d-block');
        step[previous_step].classList.add('d-none');
        if (current_step < stepCount) {
            submitBtn.classList.remove('d-inline-block');
            submitBtn.classList.add('d-none');
            nextBtn.classList.remove('d-none');
            nextBtn.classList.add('d-inline-block');
            prevBtn.classList.remove('d-none');
            prevBtn.classList.add('d-inline-block');
        }
    }
 
    if (current_step == 0) {
        prevBtn.classList.remove('d-inline-block');
        prevBtn.classList.add('d-none');
    }
    progress((100 / stepCount) * current_step);



});
 
 
// submitBtn.addEventListener('click', () => {
//     preloader.classList.add('d-block');
 
//     const timer = ms => new Promise(res => setTimeout(res, ms));
 
//     timer(3000)
//         .then(() => {
//             bodyElement.classList.add('loaded');
//         }).then(() => {
//             step[stepCount].classList.remove('d-block');
//             step[stepCount].classList.add('d-none');
//             prevBtn.classList.remove('d-inline-block');
//             prevBtn.classList.add('d-none');
//             submitBtn.classList.remove('d-inline-block');
//             submitBtn.classList.add('d-none');
//             succcessDiv.classList.remove('d-none');
//             succcessDiv.classList.add('d-block');
//         })
 
// });