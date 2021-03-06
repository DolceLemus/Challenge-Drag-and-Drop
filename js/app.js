"use strict";
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCAD63skf5RzQiGb9czLGODsoqjZIvMo00",
    authDomain: "inta-collage-lemus.firebaseapp.com",
    databaseURL: "https://inta-collage-lemus.firebaseio.com",
    projectId: "inta-collage-lemus",
    storageBucket: "inta-collage-lemus.appspot.com",
    messagingSenderId: "389980962122"
};
firebase.initializeApp(config);

let draged = null;
//   time in realtime
const time = () => {
    let today = new Date();
    let hour = today.getHours();
    //se añade un operador ternario para que se muestre un cero cuando los minutos sean menor a 10
    let minutes = (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes());
    document.getElementById("hour").innerHTML = hour;
    document.getElementById("minutes").innerHTML = minutes;
}

// battery in real time
const batteryLevel = () => {
    //se utiliza promesa para seguir con el funcionamiento una vez obtenido el dato con getBattery();
    //getBattery() es obsoleto, solo funciona en algunos navegadores, es por eso que se agrega un if;
    let battery = navigator.getBattery().then((battery) => {
        let level = battery.level * 100;
        let levelPerc = level.toFixed(0) + "%";
        let levelNumber = battery.level;
        if (battery === NaN || battery === null) {
            document.getElementById("level").textContent = "";
        } else {
            document.getElementById("level").textContent = levelPerc;
            // se le añade el valor de levelNumber en una escala a 1
            document.getElementById("battery").setAttribute('value', levelNumber);
        }
    });
}

// allow drop function
const allowDrop = (ev) => {
    ev.preventDefault();
}

// start to drag (movement) function
const dragStart = (ev) => {
    draged = ev.target;
}

// drop function
const drop = (ev) => {
    ev.preventDefault();
    let data = draged;
    if (ev.currentTarget.childNodes.length <= 0 ) {
        ev.target.appendChild(draged);
        // Utilicé JQuery por metodos prácticos
        $(draged).addClass("dropImage");
    } else {
        return false;
    }
}

$(document).ready(() => {
    $("#logout").click(() => {
        firebase.auth().signOut();
    })
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            $("#user").text(user.email);
        } else {
            window.location = "../index.html";
        }
    })

    $(".shihiro").on("dragstart",dragStart);
    $(".contenedor-img").on("drop",drop);
    $(".contenedor-img").on("dragover",allowDrop);
});


//--------------------------------------------------------
batteryLevel();
time();

