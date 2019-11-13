//declare variables
//level variable is declared in level_logic.js
let shapes = ['cone', 'sphere', 'cube']
let sliderArray = []
let generatingObjects = false;
let slidingObj = [];

function createScene(){
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer({antialias: true});
   renderer.setClearColor("#000000");
   renderer.setSize(window.innerWidth, window.innerHeight);
   let canvasDiv = document.getElementById("game-canvas")
   canvasDiv.appendChild(renderer.domElement);

   window.addEventListener('resize', (e) => {
    console.log(main)
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
    camera.aspect = window.innerWidth, window.innerHeight;
   })

//add stars
   let times = 500;
    for(var i=0; i < times; i++){
    createBackground();
   }
//add lighting
var spotLight = new THREE.SpotLight( 0xFFFFFF, 2);
spotLight.position.set( 200, 250, 600 );
spotLight.target.position.set( 100, -50, 0 );
spotLight.castShadow = true;
scene.add( spotLight.target );
scene.add( spotLight );
//Set up shadow properties for the spotLight
spotLight.shadow.mapSize.width = 512; // default
spotLight.shadow.mapSize.height = 512; // default
spotLight.shadow.camera.near = 0.5; // default
spotLight.shadow.camera.far = 15000; // default
}

createScene();

// create shape
var geometry = new THREE.SphereGeometry( 2, 32, 32 );
// create material, color, or image texture

var material = new THREE.MeshPhongMaterial ( {color: "purple", wireframe: false} );
var slider = new THREE.Mesh( geometry, material );
slider.position.y = -12;
scene.add( slider );
sliderArray.push(slider)

// zoom camera out
camera.position.z = 20;

//add event listeners
// const domEvents = new THREEx.DomEvents(camera, renderer.domElement)
// domEvents.addEventListener(slider, 'click', (e) => {
//     toggleGenerateObjects();
//     // createJackieCoin();
// })

// document.addEventListener('keydown', event => {
//     if (event.keyCode == '37' && slider.position.x > -29){
//      event.preventDefault();
//      slider.position.x -= 0.8
//     } else if (event.keyCode == '38' && slider.position.y < 14){
//         event.preventDefault();
//         slider.position.y += 0.8
//     } else if (event.keyCode == '39' && slider.position.x < 29){
//         event.preventDefault();
//         slider.position.x += 0.8
//     } else if (event.keyCode == '40' && slider.position.y > -14){
//         event.preventDefault();
//         slider.position.y -= 0.8
//     } 
//     false;
// })

//Implement Dragging
var controls = new THREE.DragControls( sliderArray, camera, renderer.domElement );
controls.addEventListener( 'dragstart', function ( event ) {
   event.object.material.emissive.set( 0xaaaaaa );
} );
controls.addEventListener( 'dragend', function ( event ) {
   event.object.material.emissive.set( 0x000000 );
   console.log(slider)
} );

//========================================================================
// createLevel(level)

//create animations
const animate = () => {
    requestAnimationFrame(animate)
    slider.rotation.x += 0.01
    slider.rotation.y += 0.01
    // slider.position.y -= 0.06
    renderer.render( scene, camera );
}

animate();


//game logic

//draw scene
var render = function () {
    renderer.render(scene,camera);
}

let randomInterval;
let explicitInterval;
let jackyInterval;
function toggleGenerateObjects(){
    generatingObjects = !generatingObjects; 

    if (generatingObjects === true){
     jackyInterval = setInterval(createJackieCoin, 15000);
     explicitInterval = setInterval(createObject, 8000, matchProfile.color, matchProfile.shape);
     randomInterval = setInterval(createObject, 3000);
    } else {
     clearInterval(jackyInterval);
     clearInterval(explicitInterval);
     clearInterval(randomInterval);
    }
}

function createObject(color, shape){

 let shapeToGenerate = shape
//if shape is not specified, we randomize shape
 if (shapeToGenerate === undefined) {
  shapeToGenerate = getRandomShape();
 }

 //if color is undefined, these functions take in an argument of "undefined" and randomize color internally
  if (shapeToGenerate === 'cone') {
   createCone(color);
  } else if (shapeToGenerate === 'sphere') {
   createSphere(color);
  } else if (shapeToGenerate === 'cube') {
   createCube(color);
  }
}

function getRandomShape(){
  return shapes[Math.floor(Math.random() * shapes.length)]
}

