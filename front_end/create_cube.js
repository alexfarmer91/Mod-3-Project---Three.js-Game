var cubeAudio = new Audio('assets/Grass4.ogg');

function createCube(color, isSlider){
    // create shape
    var cubeGeometry = new THREE.BoxGeometry( 3, 3, 3 );
    // create material, color, or image texture

    let myColor = color
    if (myColor === undefined) {
    myColor = randomColor()
    }
    
    var cubeMaterial = new THREE.MeshPhongMaterial ( {color: myColor, wireframe: false} );
    var newCube = new THREE.Mesh( cubeGeometry, cubeMaterial );
    newCube.name = `${myColor} cube`;
    newCube.position.x = Math.random() * 40 - 20;
    newCube.position.y = Math.random() * 40 + 15;
    newCube.userData.pointsValue = 0
    newCube.userData.colorMatch = false
    newCube.userData.shapeMatch = false
    newCube.userData.type = "cube"
    if (matchProfile.color !== "" && matchProfile.color === myColor){
        newCube.userData.pointsValue += 10;
        newCube.userData.colorMatch = true;
    } else if (matchProfile.color !== "" && matchProfile.color !== myColor) {
        newCube.userData.pointsValue -= 10;
        newCube.userData.colorMatch = false;
    } else if (matchProfile.shape !== "" && matchProfile.shape === newCube.userData.type) {
        newCube.userData.pointsValue += 5;
        newCube.userData.shapeMatch = true;
    } else if (matchProfile.shape !== "" && matchProfile.shape !== newCube.userData.type) {
        newCube.userData.pointsValue -= 5;
        newCube.userData.shapeMatch = false;
    }
    scene.add( newCube );
    var cubeObject = scene.getObjectByName( newCube.name );

    if (isSlider === true){
        slider = newCube
        slider.position.x = -12
    }

    let af;

  if (isSlider === undefined){ // if its not a slider, we animate it
    const animate = () => {
        af = requestAnimationFrame(animate)
        let fallSpeed = Math.random()
        let xRotation = Math.random()
        let yRotation = Math.random()
        newCube.rotation.x += xRotation
        newCube.rotation.y += yRotation
        newCube.position.y -= fallSpeed
        var deathY = -8

        if (newCube.position.y <= deathY) {
            breakOpen(myColor, newCube.position.x, newCube.position.y)
            cubeAudio.play();
            cubeObject.geometry.dispose()
            cubeObject.material.dispose()
            desiredObjects.pop();
            scene.remove(newCube);
            gameOver(); 
            cancelAnimationFrame( af );
        }

        if (newCube.position.y < -8.5 
            && newCube.position.y > -12.5 
            && (slider.position.x + 3) > newCube.position.x 
            && (slider.position.x - 3) < newCube.position.x) {
                points += newCube.userData.pointsValue
                pointsDisplay.innerText = `${points} points`
                cubeAudio.play();
                newCube.userData.pointsValue = 0 ;
                breakOpen(myColor, newCube.position.x, newCube.position.y)
                cubeObject.geometry.dispose()
                cubeObject.material.dispose()
                desiredObjects.pop();
                checkWin();
                cancelAnimationFrame( af );
                scene.remove(newCube);
        }
    }
    
    animate();
  }
    desiredObjects.push(newCube)
    }