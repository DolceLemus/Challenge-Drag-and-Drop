"use strict";
const time = () => {
    let today = new Date();
    let hour = today.getHours();
    //se añade un operador ternario para que se muestre un cero cuando los minutos sean menor a 10
    let minutes = (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes());
    document.getElementById("hour").innerHTML = hour;
    document.getElementById("minutes").innerHTML = minutes;
}


const batteryLevel = () => {
    //se utiliza promesa para seguir con el funcionamiento una vez obtenido el dato con getBattery();
    //getBattery() es obsoleto, solo funciona en algunos navegadores, es por eso que se agrega un if;
    let battery = navigator.getBattery().then(function (battery) {
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

const allowDrop = (ev) => {
    ev.preventDefault();
}

const dragStart = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
}

const drop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    // explanation : ev.target.appendChild(document.getElementById(data)); ev.target fue reemplazado por this para que no fueda posible hacer un drop dentro de otra imagen y esta desaparezca
    ev.target.appendChild(document.getElementById(data));
    // Utilicé JQuery por metodos prácticos
    $("[id*=element]").addClass("dropImage");

}

// --------------------------------------------------------

$(function() {
    $( "[id*=element]" ).draggable();
    $( "[id*=b]" ).droppable({
      drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });
  });

//--------------------------------------------------------
batteryLevel();
time();