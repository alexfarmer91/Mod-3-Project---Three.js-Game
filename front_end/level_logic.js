// matchProfile = {shape: matchShape, color: matchColor}

const objectColors = ["pink", "green", "yellow", "red", "blue", "purple"];
const shapeTypes = ["cone", "sphere", "cube"]
let sphere = createSphere
let cube = createCube
let cone = createCone
let coin = createJackieCoin
const objectKinds = [sphere, cube, cone, coin]

//create random shape
function randomShape(){
    return shapeTypes[Math.floor(Math.random() * shapeTypes.length)]
}
//create random color
function randomColor(){
    return objectColors[Math.floor(Math.random() * objectColors.length)]
}

// var level;
// var levelObjNos = fetch(user_data).then(r => r.json()).then(userInfo => {
//     userInfo.games.level.last + 1
    
// })

function createLevel(level){
    // create 'level * level" no of obecjecs
    let levelMultiplier = level * 10;


  if (level < 3) { 
    // determine shape to match
    matchProfile.shape = randomShape();

    //create a slider that matches the matching shape with random color
    determineSliderShapeAndColor(matchProfile.shape, randomColor())
  } else if (level < 6)
  {
    //determine color to match
    matchProfile.color = randomColor();

    //create slider with random shape and matching color
    determineSliderShapeAndColor(randomShape(), matchProfile.color)
  } else {
    //match by shape and color
    matchProfile.color = randomColor();
    matchProfile.shape = randomShape();

    //create slider that matches shape and color
    determineSliderShapeAndColor(matchProfile.shape, matchProfile.color)
  }

    // Create objects for current level
    for (var i = 0; i < levelMultiplier; i++) {
        objectKinds[Math.floor(Math.random() * objectKinds.length)]()

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