

var canvas = viewer.canvas;
var ellipsoid = scene.globe.ellipsoid;

// launch (karakol);
// create(current);


      function balance() {
        camera.flyTo({
          destination: viewer.camera.position,
          orientation: {
              heading : viewer.camera.heading,
                pitch : 0.0,
                roll : 0.0,
          }
        });

      }









      var startMousePosition;
      var mousePosition;
      var looking= false;
      var moveForward =false;
      var  moveBackward=false;

      var handler = new Cesium.ScreenSpaceEventHandler(canvas);
      function update(value){
        value= 0;
        return value;
      }
      handler.setInputAction(function(movement) {
          looking = true;
          mousePosition = startMousePosition = Cesium.Cartesian3.clone(movement.position);
      }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

      handler.setInputAction(function(movement) {
          mousePosition = movement.endPosition;
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      handler.setInputAction(function(position) {
          looking = false;
      }, Cesium.ScreenSpaceEventType.LEFT_UP);

  // TODO: wheel zoom indoor
  // var gg=false;
  // var ff =false;
  //     handler.setInputAction(function(delta,g) {
  //
  //       if (delta < 0){
  //          gg=g;
  //
  //       }else if (delta > 0){
  //          ff=g;
  //
  //       }
  //
  //
  //
  //      }, Cesium.ScreenSpaceEventType.WHEEL);


      function setKey(event, isOn) {

        if (event.keyCode == 38 ) { // Up.
            moveForward = isOn;

        } else if (event.keyCode == 40) { // Down.
            moveBackward = isOn;

        } else {

            // return true;
        }


    }
    function keyDown(event) {

        return setKey(event, true);
    }
    function keyUp(event) {
        return setKey(event, false);

      }
var d = function indoor(colck) {


    if (looking) {
        var width = canvas.clientWidth;
        var height = canvas.clientHeight;

        // Coordinate (0.0, 0.0) will be where the mouse was clicked.
        var x = (mousePosition.x - startMousePosition.x) / width;
        var y = -(mousePosition.y - startMousePosition.y) / height;

        var lookFactor = 0.05;
        camera.lookRight(x * lookFactor);
        camera.lookUp(y * lookFactor);
    }

    // Change movement speed based on the distance of the camera to the surface of the ellipsoid.
    var cameraHeight = ellipsoid.cartesianToCartographic(camera.position).height;
    var moveRate = cameraHeight / 10000.0;

    if (moveForward ) {
        camera.moveForward(moveRate);
    }
    if (moveBackward ) {
        camera.moveBackward(moveRate);

    }
};

 function setviewer() {
  viewer.navigationHelpButton.container.hidden=true;

 }
function kurgan() {

  // launch (karakol);
  // create(current);

  camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(85.95286679336539, 50.81761313448716, 887),
    orientation: {heading : 0.0,
          pitch : 0.0,
          roll : 0.0
    }
  });
  // disable the default event handlers
  scene.screenSpaceCameraController.enableRotate = false;
  scene.screenSpaceCameraController.enableTranslate = false;
  scene.screenSpaceCameraController.enableZoom = false;
  scene.screenSpaceCameraController.enableTilt = false;
  scene.screenSpaceCameraController.enableLook = false;
  viewer.clock.onTick.addEventListener(d);

}






      function reset() {

        viewer.clock.onTick.removeEventListener(d);
        scene.screenSpaceCameraController.enableRotate = true;
        scene.screenSpaceCameraController.enableTranslate = true;
        scene.screenSpaceCameraController.enableZoom = true;
        scene.screenSpaceCameraController.enableTilt = true;
        scene.screenSpaceCameraController.enableLook = true;
        launch(current);

      }
