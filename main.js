//Inicializacion de variable
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primer_resultado=null;
let segundo_resultado=null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivo = null;

// Apuntando a documento HTML\

let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('tiempo_restante')

//Generacion Numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

//funciones
function contartiempo(){
    tiempoRegresivo = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer==0){
            clearInterval(tiempoRegresivo);
            bloquearTarjetas();
        }
    }, 1000);
}
function bloquearTarjetas(){
    for(let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;
    }
}

//Funcion principal
function destapar(id){
    if (temporizador == false){
        contartiempo();
        temporizador = true;
    }
    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);
    
    if (tarjetasDestapadas == 1){
        //Mostrar Primer Numero
        tarjeta1 = document.getElementById(id);
        primer_resultado= numeros[id]
        tarjeta1.innerHTML = primer_resultado;
        
        //deshabilitar primer boton
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas == 2){
        //mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundo_resultado = numeros[id];
        tarjeta2.innerHTML = segundo_resultado;

        tarjeta2.disabled = true;
        //incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `movimientos: ${movimientos}`;

        if (primer_resultado==segundo_resultado){
            //Encerar contador tarjetas destapadas
            tarjetasDestapadas = 0 ;
            //aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `aciertos: ${aciertos}`;
            if(aciertos == 8){
                clearInterval(tiempoRegresivo);
                mostrarAciertos.innerHTML = `aciertos: ${aciertos}🎲`
                mostrarTiempo.innerHTML = `agg 🍌 ${timerInicial-timer} segundos`
                mostrarMovimientos.innerHTML = `movimientos: ${movimientos}🎪`
            }
        }else{
            //mostrar momentaneamentos valores y volver a tapar
            setTimeout(() => {
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas=0;
            }, 800);
        }
    }   
}