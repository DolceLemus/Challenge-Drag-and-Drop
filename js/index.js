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
        let email = $("#email").val();
        let password = $("#password").val();

        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch((error) => {
                swal(error.message);
            })

    })
    $("#logout").click(() => {
        firebase.auth().signOut();
    })

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            $("#user").text(user.email);
            window.location = "views/app.html";
        } else {
            $("#user").text("");
        }
    })


    $("#signup").click(() => {
        let email = $("#email").val();
        let password = $("#password").val();

        if (password == 123456) {
            swal("Error ", " The password can not be 123456, empty field or have less than 6 characters", "error");
            let passwordInput = $("#password").val("");
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                swal("Error", error.message, "error");
            })
        }

       

    })
});