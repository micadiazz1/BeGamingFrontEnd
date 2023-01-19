"use strict"
const resultado = "5";
let respuesta_del_usuario = document.querySelector("#respuesta")

let btn = document.getElementById("btn-enviar");
btn.addEventListener("click", verificar_formulario);
    
function verificar_formulario(){
    //aca vamos a comparar el respuesta del usuario con la constante resultado
    if (respuesta_del_usuario.value == resultado) {  //si es verdadero hace la sentencia       
        
        let correcta = document.querySelector("#resultado-de-incorrecto-correcto")
        correcta.innerHTML="Correcta"; 
        document.getElementById("img-captcha").src = "imagen/correcto.jpg"
        
    } 
    else { //si es falso la condicion anterios hace esta sentencia
        
        let incorrecto = document.querySelector("#resultado-de-incorrecto-correcto")
        incorrecto.innerHTML="Incorrecto"; 
        document.getElementById("img-captcha").src = "imagen/incorrecto.jpg"
        
    }
}