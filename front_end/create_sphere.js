
var sphereAudio = new Audio('assets/minecraft.ogg');
const pink = "#ec839f";
var level = 1

let speedArray = [0.05, 0.06, 0.08, 0.1]

const objectColors = [pink, "green", "yellow", "red", "blue", "purple"];

function randomColor() {
    return objectColors[Math.floor(Math.random() * objectColors.length)];
 }

 
 function gameOver(){
     if (desiredObjects.length === 0){
        checkWin();
        console.log('game over');
    }
    
}
function checkWin(){
    // debugger
    if (points >= level * 10){
        
        console.log('win')
 } else {
     console.log('lost')
 }
}

function createSphere(color, isSlider){
    // create shape
    var sphereGeometry = new THREE.SphereGeometry( 2, 32, 32 );
    // create material, color, or image texture
    
    let myColor = color //if color is not defined, get random color
    if (myColor === undefined) {
    myColor = randomColor()
    }
    
    var sphereMaterial = new THREE.MeshPhongMaterial ( {color: myColor, wireframe: false} );
    var newSphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    newSphere.name = `${myColor} sphere`;

    
    newSphere.position.x = Math.random() * 40 - 20;
    // newSphere.position.y = Math.random() * 40 + 15;
    newSphere.position.y = 15
    newSphere.userData.pointsValue = 0
    newSphere.userData.colorMatch = false
    newSphere.userData.shapeMatch = false
    newSphere.userData.type = "sphere"

    if (matchProfile.color !== "" && matchProfile.color === myColor){
        newSphere.userData.pointsValue += 10;
        newSphere.userData.colorMatch = true;
    } else if (matchProfile.color !== "" && matchProfile.color !== myColor) {
        newSphere.userData.pointsValue -= 10;
        newSphere.userData.colorMatch = false;
    } else if (matchProfile.shape !== "" && matchProfile.shape === newSphere.userData.type) {
        newSphere.userData.pointsValue += 5;
        newSphere.userData.shapeMatch = true;
    } else if (matchProfile.shape !== "" && matchProfile.shape !== newSphere.userData.type) {
        newSphere.userData.pointsValue -= 5;
        newSphere.userData.shapeMatch = false;
    }

    scene.add( newSphere );
    var sphereObject = scene.getObjectByName( newSphere.name );
    // console.log(sphereObject.position)

    let af; //this will be assigned to the animation frame to be cancelled later

    if (isSlider === true){ //the slider becomes the object
        slider = newSphere
        slider.position.x = -12
    }

   if (isSlider === undefined){
    const animate = () => {
        af = requestAnimationFrame(animate)
        let fallSpeed = Math.random()
        let xRotation = Math.random()
        let yRotation = Math.random()
        newSphere.rotation.x += xRotation
        newSphere.rotation.y += yRotation
        newSphere.position.y -= 0.04

        var xDif = slider.position.x - newSphere.position.x
        var yDif = slider.position.y - newSphere.position.y
        var deathY = -8

        if (newSphere.position.y <= deathY) {
            breakOpen(myColor, newSphere.position.x, newSphere.position.y)
            sphereAudio.play()
            sphereObject.geometry.dispose()
            sphereObject.material.dispose()
            desiredObjects.pop();
            scene.remove(newSphere);
            gameOver(); 
            cancelAnimationFrame( af );
        }


        // if (newSphere.position.y < -8.5 && newSphere.position.y > -12.5 && (slider.position.x + 3) > newSphere.position.x && (slider.position.x - 3) < newSphere.position.x) {
            if (yDif < 3 && yDif > -3 && xDif < 3 && xDif > -3) {  
                points += newSphere.userData.pointsValue
                pointsDisplay.innerText = `${points} points`
                sphereAudio.play();
                newSphere.userData.pointsValue = 0 ;
                breakOpen(myColor, newSphere.position.x, newSphere.position.y)
                sphereObject.geometry.dispose()
                sphereObject.material.dispose()
                desiredObjects.pop();
                cancelAnimationFrame( af );
                scene.remove(newSphere);
                gameOver();      
            } 

        
    }
    
    animate();
  }

   desiredObjects.push(newSphere)
    }