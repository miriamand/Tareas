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
  let db = firebase.firestore();
  //BotonRegistrar
  var Register= document.querySelector(".boton");
  var firebaseR=
  document.querySelector("buttons");
  //Correo
  var firebaseEmail=
  document.querySelector(".correo");
  var firebaseE=
  document.querySelector(".correousado");
  //Contraseña
  var firebasePassword=
  document.querySelector(".contraseña");
  var firebaseP=
  document.querySelector(".contraseñausado");
  //Registrar
function reg(){
    firebase.auth().createUserWithEmailAndPassword(firebaseEmail.value, firebasePassword.value)
  .then((user) => {
    // Signed in
    alert("Bienvenido");

    dat.style.display="block";
    guardar.style.display="none";
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
}

//Logear con Google
function Google(provider) {
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
      //al entrar
      alert("Bienvenido");
      dat.style.display="block";
      entrar.style.display="none";
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
}
//Logear con Facebook
function Facebook(provider) {
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
      //al entrar
      alert("Bienvenido");
      dat.style.display="block";
      entrar.style.display="none";
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
}
//Logear con Yahoo
  function Yahoo(provider) {
    var provider = new firebase.auth.OAuthProvider('yahoo.com');
    // [START auth_yahoo_signin_popup]
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        // IdP data available in result.additionalUserInfo.profile
        // ...
  
        /** @type {firebase.auth.OAuthCredential} */
        const credential = result.credential;
  
        // Yahoo OAuth access token and ID token can be retrieved by calling:
        var accessToken = credential.accessToken;
        var idToken = credential.idToken;
        //al entrar
        alert("Bienvenido");
        dat.style.display="block";
        entrar.style.display="none";
      })
      .catch((error) => {
        // Handle error.
      });
    // [END auth_yahoo_signin_popup]
  }
//Logear con Github
function Github(provider) {
  var provider = new firebase.auth.GithubAuthProvider();
  // [START auth_github_signin_popup]
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = credential.accessToken;

      // The signed-in user info.
      var user = result.user;
      //al entrar
      alert(":)");
      dat.style.display="block";
      entrar.style.display="none";
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
  // [END auth_github_signin_popup]
}
//Logear con Twitter
function Twitter(provider) {
  var provider = new firebase.auth.TwitterAuthProvider();
  // [START auth_twitter_signin_popup]
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      alert("Bienvenido");
      dat.style.display="block";
      entrar.style.display="none";
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      var token = credential.accessToken;
      var secret = credential.secret;

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
  // [END auth_twitter_signin_popup]
}
let guardar=
document.querySelector(".form-register");
let entrar=
document.querySelector(".form-login");
let dat=
document.querySelector(".form-db");
function guard(){
  guardar.style.display="block";
  entrar.style.display="none";
}
function back(){
  guardar.style.display="none"
  entrar.style.display="block"
}
//Acceso a usuarios existentes
function iniciar() {
  // [START auth_signin_password]
  firebase.auth().signInWithEmailAndPassword(firebaseE.value, firebaseP.value)
    .then((userCredential) => {
      // Signed in
      entrar.style.display="none";
      dat.style.display="block"
      alert("Bienvenido");
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      alert("Error");
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  // [END auth_signin_password]
}
//Observador
function Wachador() {
  // [START auth_state_listener]
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      //console.log(uid);
      //console.log(user);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  // [END auth_state_listener]
}
Wachador();
function salir() {
  // [START auth_sign_out]
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    alert("Hasta luego");
    entrar.style.display="block";
    guardar.style.display="none";
    dat.style.display="none";
  }).catch((error) => {
    // An error happened.
  });
  // [END auth_sign_out]
}
//Añadir, Editar y Borrar
const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");
let editStatus = false;
let id = '';
/**
 * Save a New Task in Firestore
 * @param {string} name the title of the Task
 * @param {string} data the description of the Task
 */
const saveTask = (name, data) =>
  db.collection("Datos").doc().set({
    name,
    data,
  });
let getTasks = () => db.collection("Datos").get();
let onGetTasks = (callback) => db.collection("Datos").onSnapshot(callback);
let deleteTask = (id) => db.collection("Datos").doc(id).delete();
let getTask = (id) => db.collection("Datos").doc(id).get();
let updateTask = (id, updatedTask) => db.collection('Datos').doc(id).update(updatedTask);
window.addEventListener("DOMContentLoaded", async (e) => {
  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      var task = doc.data();
      tasksContainer.innerHTML += `<div class="card card-body mt-2">
    <h3 class="h5">${task.name}</h3>
    <p>${task.data}</p>
    <div>
      <button class="btn btn-primary btn-edit" data-id="${doc.id}">
         Editar
      </button>
      <button class="btn btn-primary btn-delete" data-id="${doc.id}">
         Eliminar
      </button>
    </div>
  </div>`;
    });
    let btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async (e) => {
        console.log(e.target.dataset.id);
        try {
          await deleteTask(e.target.dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );
    let btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          taskForm["task-title"].value = task.name;
          taskForm["task-description"].value = task.data;
          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Actualizar";
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = taskForm["task-title"];
  const data = taskForm["task-description"];
  try {
    if (!editStatus) {
      await saveTask(name.value, data.value);
    } else {
      await updateTask(id, {
        name: name.value,
        data: data.value,
      })
      editStatus = false;
      id = '';
      taskForm['btn-task-form'].innerText = 'Añadir';
    }
    taskForm.reset();
    name.focus();
  } catch (error) {
    console.log(error);
  }
});