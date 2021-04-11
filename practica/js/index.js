// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCQcmg1KkS4otDinqLdsiZ5ud9SnM1KNBM",
    authDomain: "proyecto-35592.firebaseapp.com",
    projectId: "proyecto-35592",
    storageBucket: "proyecto-35592.appspot.com",
    messagingSenderId: "279090040864",
    appId: "1:279090040864:web:3722df94e7ad0b9059ec45",
    measurementId: "G-3BS1YWXWED"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

let button_Signin = document.querySelector('#button_SignIn');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
let google = document.querySelector('#google');
let facebook = document.querySelector('#facebook');

button_Signin.addEventListener('click', () =>{
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then((user) => {
    // Signed in
    // ...
    alert("REGISTRO");

    })

    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // .
    alert("error");

    });
});




//Logear con Google
 google.addEventListener("click", ()=>{
  var provider = new firebase.auth.GoogleAuthProvider();
  // [START auth_google_signin_popup]
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
});


//Logear con Facebook
facebook.addEventListener("click", ()=>{ 
  var provider = new firebase.auth.FacebookAuthProvider();
  // [START auth_facebook_signin_popup]
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // The signed-in user info.
      var user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var accessToken = credential.accessToken;

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      // ...
    });
});