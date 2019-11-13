// matchProfile = {shape: matchShape, color: matchColor}

let desiredObjects;

var level = 1

const objectColors = ["salmon", "green", "cyan", "red", "blue", "purple"];

function randomColor() {
    return objectColors[Math.floor(Math.random() * objectColors.length)];
 }

 
 function gameOver(){
     if (desiredObjects === 0){
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

//create random color
function randomColor(){
    return objectColors[Math.floor(Math.random() * objectColors.length)]
}

// var level;
// var levelObjNos = fetch(user_data).then(r => r.json()).then(userInfo => {
//     userInfo.games.last.level + 1
    
// })

function createLevel(level){
    // create 'level * level" no of obecjecs
    desiredObjects = level * 10;


  if (level < 3) { 
    // determine shape to match
    matchProfile.shape = getRandomShape();
    determineMatchProfile(matchProfile.shape);

      //this is defined in world.js
    toggleGenerateObjects();

    //create a slider that matches the matching shape with random color
    // determineSliderShapeAndColor(matchProfile.shape, randomColor())
  } else if (level < 6)
  {
    //determine color to match
    matchProfile.color = randomColor();

    //create slider with random shape and matching color
    // determineSliderShapeAndColor(getRandomShape(), matchProfile.color)
  } else {
    //match by shape and color
    matchProfile.color = randomColor();
    matchProfile.shape = getRandomShape();

    //create slider that matches shape and color
    // determineSliderShapeAndColor(matchProfile.shape, matchProfile.color)
  }

}


function determineSliderShapeAndColor(shape, color){
    if (shape === "cone") {
     createCone(color, true)
    } else if (shape === "sphere"){
     createSphere(color, true)
    } else if (shape === "cube"){
     createCube(color, true)
    }

    const domEvents = new THREEx.DomEvents(camera, renderer.domElement)
    domEvents.addEventListener(slider, 'click', (e) => {
    createSphere();
    // createCube();
    // createCone();
    // createJackieCoin();
    // debugger
})
}