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


$(document).ready(() => {
    $("#login").click(() => {
        var email = $("#email").val();
        var password = $("#password").val();

        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch((error) => {
                alert(error.message);
            })

    })
    $("#logout").click(() => {
        firebase.auth().signOut();
    })

    $("#signup").click(() => {
        var email = $("#email").val();
        var password = $("#password").val();

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                alert(error.message);
            })

    })

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            $("#user").text(user.email);
            window.location = "views/app.html";
        } else {
            $("#user").text("");
        }
    })
});