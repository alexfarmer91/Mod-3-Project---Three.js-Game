var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#000000");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth, window.innerHeight;
    camera.updateProjectionMatrix();
})

let desiredObjects = [];
// console.log(desiredObjects.length)
let slidingObj = [];
// console.log(desiredObjects)

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

// create shape
var geometry = new THREE.SphereGeometry( 2, 32, 32 );
// create material, color, or image texture

var material = new THREE.MeshPhongMaterial ( {color: "purple", wireframe: false} );
var slider = new THREE.Mesh( geometry, material );
slider.position.y = -12;
scene.add( slider );

// zoom camera out
camera.position.z = 20;

//add event listeners
const domEvents = new THREEx.DomEvents(camera, renderer.domElement)
domEvents.addEventListener(slider, 'click', (e) => {
    createSphere();
    createCube();
    createCone();
    // createJackieCoin();
    // debugger
})
document.addEventListener('keydown', event => {
    if (event.keyCode == '37' && slider.position.x > -29){
     event.preventDefault();
     slider.position.x -= 0.8
    } else if (event.keyCode == '38' && slider.position.y < 14){
        event.preventDefault();
        slider.position.y += 0.8
    } else if (event.keyCode == '39' && slider.position.x < 29){
        event.preventDefault();
        slider.position.x += 0.8
    } else if (event.keyCode == '40' && slider.position.y > -14){
        event.preventDefault();
        slider.position.y -= 0.8
    } 
    false;
})

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



