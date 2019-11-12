var jackyAudio = new Audio('assets/Bubbles5.ogg');

function createJackieCoin(){

  var coinTexture = new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('https://i.ibb.co/8bg8P1L/jacky.png'), side: THREE.DoubleSide } )

  var planeGeometry = new THREE.PlaneGeometry( 3, 3, 32 );
  var planeMaterial = new THREE.MeshBasicMaterial( coinTexture );
  var jackyCoin = new THREE.Mesh( planeGeometry, planeMaterial );
  jackyCoin.position.x = Math.random() * 40 - 20;
  jackyCoin.position.y = 15;
  jackyCoin.userData.pointsValue = 50
  jackyCoin.name = "jackycoin"
  scene.add( jackyCoin );
  let coinObject = scene.getObjectByName( jackyCoin.name );

  let af;
  const animate = () => {
    af = requestAnimationFrame(animate)
    jackyCoin.rotation.y += 0.04
    jackyCoin.position.y -= 0.07

    if (jackyCoin.position.y < -8.5 
      && jackyCoin.position.y > -12.5 
      && (slider.position.x + 3) > jackyCoin.position.x 
      && (slider.position.x - 3) < jackyCoin.position.x) {
          points += jackyCoin.userData.pointsValue
          pointsDisplay.innerText = `${points} points`
          jackyAudio.play();
          jackyCoin.userData.pointsValue = 0 ;
          breakOpen("yellow", jackyCoin.position.x, jackyCoin.position.y);
          coinObject.geometry.dispose();
          coinObject.material.dispose();
          cancelAnimationFrame( af );
          scene.remove(jackyCoin);
  }
}

animate();

// const jackyEvents = new THREEx.DomEvents(camera, renderer.domElement)
// jackyEvents.addEventListener(jackyCoin, 'click', (e) => {
//    points += jackyCoin.userData.pointsValue
//    pointsDisplay.innerText = `${points} points`
//    jackyAudio.play();
//    jackyCoin.userData.pointsValue = 0
//    breakOpen("#daa520", jackyCoin.position.x, jackyCoin.position.y)
//    scene.remove(jackyCoin)
// })
desiredObjects.push(jackyCoin)
}