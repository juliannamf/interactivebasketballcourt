"use strict"; // good practice - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
////////////////////////////////////////////////////////////////////////////////
// Basketball
////////////////////////////////////////////////////////////////////////////////

// Creates a room, with walls floor and ceiling
// Code adapted from the Room with a View excersize from class
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth*0.75, window.innerHeight*0.75);
renderer.shadowMap.enabled = true; // allow for shadows to show
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // makes shadows look softer
var clock = new THREE.Clock();

TW.mainInit(renderer, scene);

// create camera, set position and add camera controls
var camera = new THREE.PerspectiveCamera( 60,
                  window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 20, 100);
camera.lookAt(0, -126, -100);
var cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
scene.add(camera);

function createRoom(wallText1, wallText2, floorText, ceilingText, scoreboardText) {

  // create a light source for the scene
  scene.add( new THREE.AmbientLight( TW.WHITE, 0.75 ) );

  // ad spotlights to simulate flourescent light
  var light1 = new THREE.SpotLight( TW.WHITE, 0.25 );
  light1.position.set( 0, 137, 0 );
  light1.target.position.set( 64, -127, 0 );
  light1.castShadow = true;
  scene.add(light1);

  var light2 = new THREE.SpotLight( TW.WHITE, 0.25 );
  light2.position.set( 0, 137, 0 );
  light2.target.position.set( -64, -127, 0 );
  light2.castShadow = true;
  scene.add(light2);

  // create material for front and back walls
  var wallMat1 = new THREE.MeshLambertMaterial( {color: 0xffffff, map: wallText1});
  wallText1.wrapS = THREE.RepeatWrapping;
  wallText1.wrapT = THREE.RepeatWrapping;
  wallText1.repeat.set(1, 1);

  // create material for left and right walls
  var wallMat2 = new THREE.MeshLambertMaterial( {color: 0xffffff, map: wallText2});
  wallText2.wrapS = THREE.RepeatWrapping;
  wallText2.wrapT = THREE.RepeatWrapping;
  wallText2.repeat.set(2, 1);

  // create mesh for the back wall and add it to the scene
  var backWallGeom = new THREE.PlaneGeometry(274, 274);
  var backWallMesh = new THREE.Mesh(backWallGeom, wallMat1);
  backWallMesh.position.set(0, 0, -256);
  backWallMesh.recieveShadow = true;
  scene.add(backWallMesh);

  var frontWallMesh = backWallMesh.clone();
  frontWallMesh.position.set(0, 0, 256);
  frontWallMesh.rotation.set(0, Math.PI, 0);
  frontWallMesh.recieveShadow = true;
  scene.add(frontWallMesh);

  // create mesh for the left wall and add it to the scene
  var leftWallGeom = new THREE.PlaneGeometry(512, 274);
  var leftWallMesh = new THREE.Mesh(leftWallGeom, wallMat2);
  leftWallMesh.position.set(-137, 0, 0);
  leftWallMesh.rotation.set(0, Math.PI/2, 0);
  leftWallMesh.receiveShadow = true;
  scene.add(leftWallMesh);

  var rightWallMesh = leftWallMesh.clone();
  rightWallMesh.position.set(137, 0, 0);
  rightWallMesh.rotation.set(0, -Math.PI/2, 0);
  rightWallMesh.recieveShadow = true;
  scene.add(rightWallMesh);

  // add scoreboard to wall
  var scoreboardGeom = new THREE.PlaneGeometry(1024, 512);
  var scoreboardMat = new THREE.MeshLambertMaterial({color: TW.WHITE, map: scoreboardText});
  var scoreboardMesh = new THREE.Mesh(scoreboardGeom, scoreboardMat);
  scoreboardMesh.position.set(-136, 25, 0);
  scoreboardMesh.rotation.set(0, Math.PI/2, 0);
  scoreboardMesh.scale.set(0.09, 0.09, 0.09);
  scene.add(scoreboardMesh);

  // create material and mesh for the floor and add it to the scene
  var floorMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, map: floorText});
  var floorGeom = new THREE.PlaneGeometry(274, 512);
  var floorMesh = new THREE.Mesh(floorGeom, floorMaterial);
  floorMesh.position.set(0, -137, 0);
  floorMesh.rotation.set(-Math.PI/2, 0, 0);
  floorMesh.receiveShadow = true;
  scene.add(floorMesh);

  // create material and mesh for the ceiling and add it to the scene
  var ceilingMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, map: ceilingText});
  ceilingText.wrapS = THREE.RepeatWrapping;
  ceilingText.wrapT = THREE.RepeatWrapping;
  ceilingText.repeat.set(3, 5);
  var ceilingGeom = new THREE.PlaneGeometry(274, 512);
  var ceilingMesh = new THREE.Mesh(ceilingGeom, ceilingMaterial);
  ceilingMesh.position.set(0, 137, 0);
  ceilingMesh.rotation.set(Math.PI/2, 0, 0);
  scene.add(ceilingMesh);
}

function createHoop(boardText, netText) {

    // create base of basketball hoop
    var base = new THREE.BoxGeometry(7, 100, 7);
    var baseMat = new THREE.MeshLambertMaterial({color: 0x00008B});
    var baseMesh = new THREE.Mesh(base, baseMat);
    baseMesh.position.set(0, -88, -234);
    scene.add(baseMesh);

    // clone and put on other side of court
    var baseMesh2 = baseMesh.clone();
    baseMesh2.position.set(0, -88, 234);
    scene.add(baseMesh2);

    // create backboard for basketball hoop
    var backboard = new THREE.BoxGeometry(70, 50, 2);
    var backboardMat = new THREE.MeshLambertMaterial({color: TW.WHITE,
                                                    map: boardText});
    var backboardMesh = new THREE.Mesh(backboard, backboardMat);
    backboardMesh.position.set(0, -28, -230);
    scene.add(backboardMesh);

    // clone and add to other side of court
    var backboardMesh2 = backboardMesh.clone();
    backboardMesh2.position.set(0, -28, 230);
    scene.add(backboardMesh2);

    // create ring for basketball hoop
    var ringGeom = new THREE.TorusGeometry(10, 1, 16, 20);
    var ringMat = new THREE.MeshLambertMaterial({color: 0xCB1111});
    var ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.position.set(0, -46, -217);
    ringMesh.rotation.set(-Math.PI/2, 0, 0);
    scene.add(ringMesh);

    // clone and add to other side of court
    var ringMesh2 = ringMesh.clone();
    ringMesh2.position.set(0, -46, 217);
    scene.add(ringMesh2);

    //create netting for basketball hoop
    var netGeom = new THREE.CylinderGeometry(10, 7, 20, 20);
    var netMat = new THREE.MeshLambertMaterial({transparent: true, map: netText});
    var netMesh = new THREE.Mesh(netGeom, netMat);
    netMesh.position.set(0, -58, -217);
    scene.add(netMesh);

    // clone and add to other side of court
    var netMesh2 = netMesh.clone();
    netMesh2.position.set(0, -58, 217);
    scene.add(netMesh2);

}

function createBasketball(basketText){
  // create basketball for the scene
  var sphere = new THREE.SphereGeometry(10, 32, 16);
  var sphereMat = new THREE.MeshLambertMaterial({color: TW.ORANGE,
                                                map: basketText});
  var sphereMesh = new THREE.Mesh(sphere, sphereMat);
  sphereMesh.position.set(0, -126, -100);
  sphereMesh.rotation.set(Math.PI, Math.PI/3, Math.PI/2);
  scene.add(sphereMesh);

  sphereMesh.castShadow = true;
  sphereMesh.receiveShadow = true;

  var speed = 2;

  document.addEventListener("keydown", onDocumentKeyDown);
  function onDocumentKeyDown(event) {
      var keyCode = event.which;
      if (keyCode == 87 && (sphereMesh.position.z-speed) > -246) { // w key
          sphereMesh.position.z -= speed;
      } else if (keyCode == 83 && (sphereMesh.position.z+speed) < 246) { // s key
          sphereMesh.position.z += speed;
      } else if (keyCode == 65 && (sphereMesh.position.x-speed) > -127) { // a key
          sphereMesh.position.x -= speed;
      } else if (keyCode == 68 && (sphereMesh.position.x+speed) < 127) { // d key
          sphereMesh.position.x += speed;
      } else if (keyCode == 32) { // space bar
          sphereMesh.position.set(0, -126, -100);
      }
      render();
  }

      scene.add(sphereMesh);
      // set constants for animation calculation
      let acceleration = 9.8;
      let bounce_distance = 40;
      let bottom_position_y = -126;
      let time_step = 0.1;
      let time_counter = Math.sqrt(bounce_distance*2 / acceleration);
      let initial_speed = acceleration * time_counter;

      // calulcations for changing the y coordinate for the sphere,
      // to make it bounce up and down
      const animate = () => {
        window.requestAnimationFrame(animate);
        if (sphereMesh.position.y < bottom_position_y) {
          time_counter = 0;
        }

        sphereMesh.position.y = bottom_position_y + initial_speed * time_counter - 0.5 *
                          acceleration * time_counter * time_counter;

        time_counter += time_step;
        render();

      };
      animate();
    }

// pass textures into appropiate functions
function displayRoom (textures) {

    createRoom(textures[0], textures[1], textures[2], textures[3], textures[7]);
    createBasketball(textures[4]);
    createHoop(textures[5], textures[6]);

    render();
}

// load textures and pass into function
TW.loadTextures(["./textures/wall.jpg", "./textures/wall.jpg",
                  "./textures/floor.jpg", "./textures/ceiling.jpeg",
                "./textures/basketball.png", "./textures/backboard.jpg",
                "./textures/netting.png", "./textures/scoreboard.png"],
                function(textures) {
                  displayRoom(textures);
                });

function render() {
	var delta = clock.getDelta();
	cameraControls.update(delta);

	renderer.render(scene, camera);
}
