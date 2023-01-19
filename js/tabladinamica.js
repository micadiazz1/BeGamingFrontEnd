"use strict"
document.querySelector("#btn-cargar").addEventListener('click', cargar);

const miurl = "https://60c7ce37afc88600179f5b80.mockapi.io/api/ventas/";

let inputnombre = document.querySelector("#input-name");
let inputapellido = document.querySelector("#input-apellido");
let inputproducto = document.querySelector("#input-producto");
let inputcantidad = document.querySelector("#input-cantidad");


async function cargartabla(){
    document.querySelector("#body-tabla").innerHTML = "";
    try { 
        let res = await fetch (miurl);
        let json = await res.json();
        
        for(const item of json){
            mostrartabla(item);
        }

    } 
    catch (error){
        console.log(error);
    }  
}

function mostrartabla(item){
    let bodyDOM = document.querySelector("#body-tabla");
    let tr = document.createElement("tr");
    bodyDOM.appendChild(tr);
    tr.innerHTML +=
                 `<td> ${item.nombre} </td>
                 <td> ${item.apellido} </td>
                 <td> ${item.producto} </td>
                 <td> ${item.cantidad} </td>
                 <td><button id="btn-borrar" data-borrar='${item.id}'> borrar </button></td>
                 <td><button id="btn-modificar" data-modificar='${item.id}'> editar </button></td>`;
    
    document.querySelectorAll("#btn-borrar").forEach((button) => {
        button.addEventListener('click', borrar)
    });
    document.querySelectorAll("#btn-modificar").forEach((button) => {
        button.addEventListener('click', modificar);
    });       
}

async function cargar(){
    
    let nombre= inputnombre.value;
    let apellido= inputapellido.value;
    let producto=inputproducto.value;
    let cantidad= parseInt(inputcantidad.value);
    
    let venta = {
        "nombre" : nombre,
        "apellido": apellido,
        "producto": producto,
        "cantidad": cantidad

    }
    console.log("ventas",venta);  
    try{

        let res= await fetch (miurl, {
            "method":"POST",
            "headers": {  "Content-type" : "application/json"},
            "body":JSON.stringify(venta)
        });
    let json= await res.json(); 
    console.log ("Ha cargado",json);
    
}
    catch (error){
        console.log(error);
    } 
    cargartabla();   
}
async function borrar(){
    try{
        let id = this.dataset.borrar;
        let res= await fetch (miurl + id, {
            "method":"DELETE",
        });
        let json = await res.json();
        console.log("Fue eliminado",json);
        if (res.status == 200){
            cargartabla();
        }
        else {
            console.log("No se pudo borrar")
        }
    }

        catch (error){
            console.log(error);
        }  
    } 


async function modificar(){
    try{
        let id = this.dataset.modificar;
        let nombre= inputnombre.value;
        let apellido= inputapellido.value;
        let producto=inputproducto.value;
        let cantidad= parseInt(inputcantidad.value);
    
        let venta = {
            "nombre" : nombre,
            "apellido": apellido,
            "producto": producto,
            "cantidad": cantidad
        }
        
        let res= await fetch (miurl + id, {
            "method":"PUT",
            "headers": {  "Content-type" : "application/json"},
            "body":JSON.stringify(venta)
        });
        let json = await res.json();
        console.log("Fue modificado",json);
        
        if ( res.ok || res.status == 201){ 
            cargartabla();
        }
        else {
            console.log("No se pudo modicar")
        }
    }
   
    
        catch (error){
            console.log(error);
        }     
    
}
cargartabla(); 

// -------filtro --------- 

document.getElementById("btn-filtro").addEventListener('click', function(){
    let filtroinput =  document.getElementById("input-filtro");
    filtro(filtroinput);
});

async function filtro(valor){
    try{
        let res = await fetch(miurl);
        let json = await res.json();
        let arrayaux = [];
        
        for (const item of json) {
            if(valor.value == item.cantidad){
                arrayaux.push(item);
                console.log(item);
            }
        }
        document.getElementById("body-tabla").innerHTML="";
        if(arrayaux.length){
            for (const item of arrayaux) {
                mostrartabla(item);
            }
        } 
        else{
            document.getElementById("advertencia").innerHTML+=  `<p>El número enviado no se encuentra en la tabla</p> `;
            
        }
    }
    catch (error){
        console.log(error);
    }   

}
