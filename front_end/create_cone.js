var coneAudio = new Audio('assets/GlassBreak.ogg');

function createCone(color, isSlider){
    // create shape

    var coneGeometry = new THREE.ConeBufferGeometry( 2, 3, 32 );

    let myColor = color
    if (myColor === undefined) {
    myColor = randomColor()
    }

    var coneMaterial = new THREE.MeshPhongMaterial( {color: myColor} );
    var newCone = new THREE.Mesh( coneGeometry, coneMaterial );
    newCone.name = `${myColor} cone`
    scene.add( newCone );

    newCone.position.x = Math.random() * 40 - 20;
    newCone.position.y = Math.random() * 40 + 15;
    newCone.userData.pointsValue = 0
    newCone.userData.colorMatch = false
    newCone.userData.shapeMatch = false
    newCone.userData.type = "cone"
    if (matchProfile.color !== "" && matchProfile.color === myColor){
        newCone.userData.pointsValue += 10;
        newCone.userData.colorMatch = true;
    } else if (matchProfile.color !== "" && matchProfile.color !== myColor) {
        newCone.userData.pointsValue -= 10;
        newCone.userData.colorMatch = false;
    } else if (matchProfile.shape !== "" && matchProfile.shape === newCone.userData.type) {
        newCone.userData.pointsValue += 5;
        newCone.userData.shapeMatch = true;
    } else if (matchProfile.shape !== "" && matchProfile.shape !== newCone.userData.type) {
        newCone.userData.pointsValue -= 5;
        newCone.userData.shapeMatch = false;
    }
    
    scene.add( newCone );
    var coneObject = scene.getObjectByName( newCone.name );
    let af;

    if (isSlider === true){
        slider = newCone
        slider.position.x = -12
    }

    if (isSlider === undefined){ //if its NOT a slider, we animate it
    
    const animate = () => {
        af = requestAnimationFrame(animate)
        let fallSpeed = Math.random() + 0.01
        let xRotation = Math.random() - 0.1
        let yRotation = Math.random() - 0.1
        newCone.rotation.x += xRotation
        newCone.rotation.y += yRotation
        newCone.position.y -= fallSpeed
        var deathY = -8

        if (newCone.position.y <= deathY) {
            breakOpen(myColor, newCone.position.x, newCone.position.y)
            coneAudio.play();
            coneObject.geometry.dispose()
            coneObject.material.dispose()
            desiredObjects.pop();
            scene.remove(newCone);
            gameOver(); 
            cancelAnimationFrame( af );
        }

        if (newCone.position.y < -8.5 
            && newCone.position.y > -12.5 
            && (slider.position.x + 3) > newCone.position.x 
            && (slider.position.x - 3) < newCone.position.x) {
                points += newCone.userData.pointsValue
                pointsDisplay.innerText = `${points} points`
                coneAudio.play();
                newCone.userData.pointsValue = 0 ;
                breakOpen(myColor, newCone.position.x, newCone.position.y)
                coneObject.geometry.dispose()
                coneObject.material.dispose()
                desiredObjects.pop();
                checkWin();
                cancelAnimationFrame( af );
                scene.remove(newCone);
        }
    }
    
    animate();
  }

    desiredObjects.push(newCone)
    }