//Acceso
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJjZXoiLCJhIjoiY2s2Mmx4M2t0MGZ3aDNscG1hY2t2cDdxNCJ9.sIWuKq1dXS4v_QB87b5CBQ';

//Mapa
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/mapbox/dark-v10', // style URL
center: [148.9819, -35.39847], // starting position [lng, lat]
zoom: 18 // starting zoom
});

//Controles
map.addControl(new mapboxgl.NavigationControl());

//Modelo 3D
// parameters to ensure the model is georeferenced correctly on the map
var modelOrigin = [148.9819, -35.39847];
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
'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf',
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
});

//Icono
map.on('load', function () {
    // Load an image from an external URL.
    map.loadImage(
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png',
    function (error, image) {
    if (error) throw error;
     
    // Add the image to the map style.
    map.addImage('cat', image);
     
    // Add a data source containing one point feature.
    map.addSource('point', {
    'type': 'geojson',
    'data': {
    'type': 'FeatureCollection',
    'features': [
    {
    'type': 'Feature',
    'geometry': {
    'type': 'Point',
    'coordinates': [148.9819, -35.39847]
    }
    }
    ]
    }
    });
     
    // Add a layer to use the image to represent the data.
    map.addLayer({
    'id': 'points',
    'type': 'symbol',
    'source': 'point', // reference the data source
    'layout': {
    'icon-image': 'cat', // reference the image
    'icon-size': 0.25
    }
    });
    }
    );
    });
    //Lineas
    let linea = [
        [
          -110.9619140625,
          31.372399104880525
        ],
        [
          -110.9619140625,
          31.147006308556566
        ],
        [
          -110.8740234375,
          31.015278981711266
        ],
        [
          -110.8740234375,
          30.789036751261136
        ],
        [
          -110.93994140625,
          30.619004797647808
        ],
        [
          -111.11572265625,
          30.581179257386985
        ],
        [
          -111.33544921874999,
          30.581179257386985
        ],
        [
          -111.57714843749999,
          30.619004797647808
        ],
        [
          -111.8408203125,
          30.713503990354965
        ]
      ]
    map.on('load', function () {
        map.addSource('route', {
        'type': 'geojson',
        'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
        'type': 'LineString',
        "coordinates": linea
        }
        }
        });
        map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
        'paint': {
        'line-color': '#888',
        'line-width': 8
        }
        });
        });