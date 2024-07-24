const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const pause = new Audio('./sonidos/pause.mp3');
const start = new Audio('./sonidos/play.wav');
const end = new Audio('./sonidos/beep.mp3');
const botonInciarPausar = document.querySelector('#start-pause');
const textoIniciarPausar = document.querySelector('#start-pause span');
const imagenBoton = document.querySelector('.app__card-primary-butto-icon');
const tiempoEnPantalla = document.querySelector('#timer');

let tiempoTranscurridoEnSegundos = 1500;
let idIntervalo = null;

musica.loop = true;

inputEnfoqueMusica.addEventListener('change',()=>{
    if (musica.paused){
    musica.play()
    } else{
    musica.pause()
    }
})

botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300;
    cambiarContexto ('descanso-corto')
    botonCorto.classList.add('active')
    

})

botonEnfoque.addEventListener('click', () => { 
    tiempoTranscurridoEnSegundos = 1500;
    cambiarContexto ('enfoque')
    botonEnfoque.classList.add('active')
    
})

botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900;
    cambiarContexto ('descanso-largo')
    botonLargo.classList.add('active')
    
})

function cambiarContexto (contexto){
    mostrarTiempo()

    html.setAttribute('data-contexto', contexto);   
    banner.setAttribute('src', `./imagenes/${contexto}.png`)
    
    botones.forEach(function(contexto){
        contexto.classList.remove('active')
    })

    switch (contexto){
        case "enfoque":
        titulo.innerHTML = `Optimiza tu productividad,<br>
        <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
        break;

        case "descanso-corto":
        titulo.innerHTML = `¿Qué tal tomar un respiro?,<br>
        <strong class="app__title-strong">¡Haz una pausa corta!.</strong>`
        break;

        case "descanso-largo":
        titulo.innerHTML = `Hora de volver a la superficie,<br>
        <strong class="app__title-strong">Haz una pausa larga.</strong>`
        break;

        default:
        break;

    }
    
}


botonInciarPausar.addEventListener('click', iniciarPausar);

function iniciarPausar (){

    
    
    if(idIntervalo){
        reiniciar()
        pause.play()
        // console.log('intervalofun ' , idIntervalo)
        return
        
    } else{
        start.play();
    }

    idIntervalo = setInterval(cuentaRegresiva, 1000);
    console.log('intervalo ' , idIntervalo)
}

const cuentaRegresiva = () =>{
    if(tiempoTranscurridoEnSegundos <=0){
        reiniciar()
        end.play()
        
    } else {
        textoIniciarPausar.textContent = 'Pausar'
        imgBoton('pause')
        tiempoTranscurridoEnSegundos -= 1
        mostrarTiempo();
    // console.log(tiempoTranscurridoEnSegundos)
    }
    
}

function imgBoton(src){
    imagenBoton.setAttribute('src', `./imagenes/${src}.png`)
}
function reiniciar(){
    clearInterval(idIntervalo)
    idIntervalo = null
    textoIniciarPausar.textContent = 'Comenzar'
    imgBoton('play_arrow' )
}

function mostrarTiempo(){
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000);
    const tiempoFormato = tiempo.toLocaleTimeString('es-MX',{minute:'2-digit', second:'2-digit'})
    tiempoEnPantalla.innerHTML = `${tiempoFormato}`
}
mostrarTiempo();