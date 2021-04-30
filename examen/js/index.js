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
  let Register= document.querySelector(".boton");
  let firebaseR = document.querySelector("buttons");
  
  

let google = document.querySelector("#google");


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
});



let entrar = document.querySelector(".form-login");
let dat = document.querySelector(".form-db");


function guard(){
  guardar.style.display="block";
  entrar.style.display="none";
}
function back(){
  guardar.style.display="none"
  entrar.style.display="block"
}


//Observador
function Observador() {
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
Observador();
function salir() {
  // [START auth_sign_out]
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    alert("Hasta luego");
    entrar.style.display="block";
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
  const data = taskForm["pais"];
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

mapboxgl.accessToken = 'pk.eyJ1IjoibWlycGFtIiwiYSI6ImNrbmhqaHB1eDBwMjMydnA1dDRheWtxcmMifQ.yVM_E4FHQBGgq0by_nGdtA';
var map = new mapboxgl.Map({
container: 'map',
// style: 'mapbox://styles/mapbox/streets-v11',
style: 'mapbox://styles/mapbox/light-v10',
zoom: 19,
center: [-103.5005034506321,
          25.549313051642457],
pitch: 60,
antialias: true
    
    
});
// parameters to ensure the model is georeferenced correctly on the map
var modelOrigin = [-103.5005034506321,
          25.549313051642457];
var modelAltitude = 0;
var modelRotate = [Math.PI / 2, 0, 0];
 
var modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
modelOrigin,
modelAltitude
);
 
// transformation parameters to position, rotate and scale the 3D model onto the map
var modelTransform = {
translateX: modelAsMercatorCoordinate.x,
translateY: modelAsMercatorCoordinate.y,
translateZ: modelAsMercatorCoordinate.z,
rotateX: modelRotate[0],
rotateY: modelRotate[1],
rotateZ: modelRotate[2],
/* Since our 3D model is in real world meters, a scale transform needs to be
* applied since the CustomLayerInterface expects units in MercatorCoordinates.
*/
scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
};
 
var THREE = window.THREE;
scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()*200000
// configuration of the custom layer for a 3D model per the CustomLayerInterface
var customLayer = {
id: '3d-model',
type: 'custom',
renderingMode: '3d',
onAdd: function (map, gl) {
this.camera = new THREE.Camera();
this.scene = new THREE.Scene();
 
// create two three.js lights to illuminate the model
var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, -70, 100).normalize();
this.scene.add(directionalLight);
 
var directionalLight2 = new THREE.DirectionalLight(0xffffff);
directionalLight2.position.set(0, 70, 100).normalize();
this.scene.add(directionalLight2);
 
// use the three.js GLTF loader to add the 3D model to the three.js scene
var loader = new THREE.GLTFLoader();
loader.load(
'./img/fem.glb',
function (gltf) {
this.scene.add(gltf.scene);
}.bind(this)
);
this.map = map;
 
// use the Mapbox GL JS map canvas for three.js
this.renderer = new THREE.WebGLRenderer({
canvas: map.getCanvas(),
context: gl,
antialias: true
});
 
this.renderer.autoClear = false;
},
render: function (gl, matrix) {
var rotationX = new THREE.Matrix4().makeRotationAxis(
new THREE.Vector3(1, 0, 0),
modelTransform.rotateX
);
var rotationY = new THREE.Matrix4().makeRotationAxis(
new THREE.Vector3(0, 1, 0),
modelTransform.rotateY
);
var rotationZ = new THREE.Matrix4().makeRotationAxis(
new THREE.Vector3(0, 0, 1),
modelTransform.rotateZ
);
 
var m = new THREE.Matrix4().fromArray(matrix);
var l = new THREE.Matrix4()
.makeTranslation(
modelTransform.translateX,
modelTransform.translateY,
modelTransform.translateZ
)
.scale(
new THREE.Vector3(
modelTransform.scale,
-modelTransform.scale,
modelTransform.scale
)
)
.multiply(rotationX)
.multiply(rotationY)
.multiply(rotationZ);
 
this.camera.projectionMatrix = m.multiply(l);
this.renderer.resetState();
this.renderer.render(this.scene, this.camera);
this.map.triggerRepaint();
}
};
 
map.on('style.load', function () {
map.addLayer(customLayer, 'waterway-label');
map.addControl(new mapboxgl.NavigationControl());
});