"use strict";
let id ="";
let id2 =""; 
const time = () => {
    let today = new Date();
    let hour = today.getHours();
    //se añade un operador ternario para que se muestre un cero cuando los minutos sean menor a 10
    let minutes = (today.getMinutes()<10? '0' + today.getMinutes() : today.getMinutes()); 
    document.getElementById("hour").innerHTML = hour;
    document.getElementById("minutes").innerHTML = minutes;
}


const batteryLevel = () => {
    //se utiliza promesa para seguir con el funcionamiento una vez obtenido el dato con getBattery();
    //getBattery() es obsoleto, solo funciona en algunos navegadores, es por eso que se agrega un if;
    let battery = navigator.getBattery().then(function (battery) {
        let level = battery.level.toFixed(0) * 100 + "%";
        let levelNumber = battery.level;
        if (battery === NaN || battery === null) {
            document.getElementById("level").textContent = "";
        } else {
            document.getElementById("level").textContent = level;
            // se le añade el valor de levelNumber en una escala a 1
            document.getElementById("battery").setAttribute('value',levelNumber);
        }
    });
}

// box1
const allowDrop = (event) => {
    event.preventDefault();
}

const drop = (event) => {
    event.target.append(document.getElementById(id));
}

const dragStart = (event) =>  {
    id = event.target.id;
}





batteryLevel();
time();