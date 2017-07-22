Cesium.BingMapsApi.defaultKey = 'AovQCWpnauHAxG1dQkX69IJyrXUHqCWGdG1xafecdti7Trv9aAn49GABW4umeIqJ';
var viewer = new Cesium.Viewer('cesiumContainer', {
  selectionIndicator: false,
  baseLayerPicker: false,
  fullscreenButton: false,
  homeButton: false,
  sceneModePicker: false,
  timeline: false,
  animation: false

});
//  viewer.extend(Cesium.viewerCesiumInspectorMixin);

viewer.extend(Cesium.viewerCesiumNavigationMixin,{});
viewer.infoBox.frame.sandbox = "allow-same-origin allow-top-navigation allow-pointer-lock allow-popups allow-forms allow-scripts";
viewer.infoBox.frame.removeAttribute('sandbox');
viewer.scene.globe.depthTestAgainstTerrain = true;
viewer.scene.frameState.creditDisplay.addDefaultCredit(new Cesium.Credit('cesiumContainer', 'assets/images/tud-128x62.png ', 'https://tu-dresden.de/bu/umwelt/geo/ifk'));
viewer.scene.frameState.creditDisplay.addDefaultCredit(new Cesium.Credit('cesiumContainer', 'assets/images/geo.png', 'http://www.geoeyefoundation.org/'));

var scene = viewer.scene;
var camera = scene.camera;
var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
var logoUrl = 'data/billboards/goat.jpg';
var m, im,p, model_im, other_im, provider, current;
var checked = true;
var GISisOn = false;
var TerrainIsOn = false;
var IkonosIsOn = false;
var BuildingsIsON=false;
var layers = viewer.scene.imageryLayers;
var t = viewer.entities.add(new Cesium.Entity());
var k = viewer.entities.add(new Cesium.Entity());
var tuekta_terrainProvider = new Cesium.CesiumTerrainProvider({
  url: ' http://207.154.237.111:8888/tilesets/tiles/'
});
var tuekta_cent = Cesium.Cartesian3.fromDegrees(85.88383177000060, 50.83765943000035);
var tuekta_hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-0.90), 0.0, Cesium.Math.toRadians(0));
var tuekta_orientation = Cesium.Transforms.headingPitchRollQuaternion(tuekta_cent, tuekta_hpr);
var tuekta_image = new Cesium.ImageryLayer(new Cesium.SingleTileImageryProvider({
  url: 'data/imagery/tuekta_ikonos.jpg',
  rectangle: Cesium.Rectangle.fromDegrees(85.8460710132402056, 50.8080086113231388, 85.9226210132402031, 50.8511286113231407)
}));
var karakol_terrainProvider = new Cesium.CesiumTerrainProvider({
  url: ' http://207.154.237.111:8000/tilesets/tiles/'
});


var karakol_image = new Cesium.ImageryLayer(new Cesium.SingleTileImageryProvider({
  url: 'data/imagery/karakol_ikonos.jpg',
  rectangle: Cesium.Rectangle.fromDegrees(85.9238437666018200, 50.7927500947573805, 86.0044637666018303, 50.8442500947573777)
}));

var karakol_cent = Cesium.Cartesian3.fromDegrees(85.95298, 50.81486, 884.4);
var karakol_hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-0.76), 0.0, Cesium.Math.toRadians(0));
var karakol_orientation = Cesium.Transforms.headingPitchRollQuaternion(karakol_cent, karakol_hpr);

var bing_source =new Cesium.ImageryLayer( new Cesium.BingMapsImageryProvider({
  url: 'https://dev.virtualearth.net'
}));


var osm_source = new Cesium.ImageryLayer(Cesium.createOpenStreetMapImageryProvider({
  url: 'https://a.tile.openstreetmap.org/'
}));
var karakol = {
  camera:{
    destination: Cesium.Cartesian3.fromDegrees(85.95115667356953,50.78042115209972,3079.575032013868),
    orientation:{heading: 0.0,
            pitch : Cesium.Math.toRadians(-35.0),
            roll : 0.0
        }
  },
  other_image: tuekta_image,
  other: t,
  parent: k,
  cent: karakol_cent,
  orientation: karakol_orientation,
  terrainProvider: karakol_terrainProvider,
  image: karakol_image,
  scale: 1,
  uri: 'data/3d/kara.gltf',
  buildings: 'data/GIS/kara_buildings.geojson',
  archeo: 'data/GIS/kara_archeo.geojson',
  forest: 'data/GIS/kara_forest.geojson',
  road: 'data/GIS/kara_road.geojson',
  river: 'data/GIS/kara_river.geojson',
  stone: 'data/GIS/kara_stone.geojson',
  stone_2: 'data/GIS/kara_stone_2.geojson',

};



var tuekta = {
  camera:{
    destination: Cesium.Cartesian3.fromDegrees(85.88276761171318, 50.81612402131404,2787.550547062463),
    orientation:{heading: 0.0,
            pitch : Cesium.Math.toRadians(-35.0),
            roll : 0.0
        }
  },
  other_image: karakol_image,
  other: k,
  parent: t,
  cent: tuekta_cent,
  orientation: tuekta_orientation,
  terrainProvider: tuekta_terrainProvider,
  image: tuekta_image,
  scale: 100,
  uri: 'data/3d/tuekta.gltf',
  buildings: 'data/GIS/tuek_buildings.geojson',
  archeo: 'data/GIS/tuek_archeo.geojson',
  forest: 'data/GIS/tuek_forest.geojson',
  road: 'data/GIS/tuek_road.geojson',
  river: 'data/GIS/tuek_river.geojson',
  stone: 'data/GIS/tuek_stone.geojson',
  stone_2: 'data/GIS/tuek_stone_2.geojson'


};



var bing = {
  source: bing_source,
  other: osm_source,
  buildings: {
    clampToGround: true,
    fill: Cesium.Color.DARKGREEN.withAlpha(0.3),
    outline: false
  },
  archeo: {
    clampToGround: true,
    fill: Cesium.Color.CRIMSON.withAlpha(0.3),
    outline: false
  },
  forest: {
    clampToGround: true,
    fill: Cesium.Color.DEEPPINK.withAlpha(0.3),
    outline: false
  },
  road: {
    clampToGround: true,
    fill: Cesium.Color.ORANGERED.withAlpha(0.3),
    outline: false
  },
  river: {
    clampToGround: true,
    fill: Cesium.Color.BLUE.withAlpha(0.3),
    outline: false
  },
  stone: {
    clampToGround: true,
    fill: Cesium.Color.DIMGREY.withAlpha(0.3),
    outline: false
  },
  stone_2: {
    clampToGround: true,
    fill: Cesium.Color.DARKGRAY.withAlpha(0.3),
    outline: false
  },


};
var osm = {
  source: osm_source,
  other: bing_source,
  buildings: {
    clampToGround: true,
    fill: Cesium.Color.BLACK.withAlpha(0.3),
    outline: false
  },
  archeo: {
    clampToGround: true,
    fill: Cesium.Color.CRIMSON.withAlpha(0.3),
    outline: false
  },
  forest: {
    clampToGround: true,
    fill: Cesium.Color.DARKSEAGREEN.withAlpha(0.3),
    outline: false
  },
  road: {
    clampToGround: true,
    fill: Cesium.Color.ORANGERED.withAlpha(0.3),
    outline: false
  },
  river: {
    clampToGround: true,
    fill: Cesium.Color.BLUE.withAlpha(0.3),
    outline: false
  },
  stone: {
    clampToGround: true,
    fill: Cesium.Color.DIMGREY.withAlpha(0.3),
    outline: false
  },
  stone_2: {
    clampToGround: true,
    fill: Cesium.Color.DARKGRAY.withAlpha(0.3),
    outline: false
  },
};

var current_mode = bing;
//karakol icones
viewer.entities.add({

  parent: k,
  position: Cesium.Cartesian3.fromDegrees(85.935161405039807, 50.819749536016246, 950),
  billboard: {
    image: logoUrl,
    scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
    scale: 0.03
  }
});
viewer.entities.add({
  parent: k,
  position: Cesium.Cartesian3.fromDegrees(85.952872864512827, 50.817814523725225, 920),
  billboard: {
    image: logoUrl,
    scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
    scale: 0.03
  }
});



function flyto(model) {
  viewer.camera.flyTo(model.camera);

}





function render(threeD) {

   viewer.entities.add({
    name: 'Loading......',
    parent: threeD.parent,
    orientation: threeD.orientation,
    position: threeD.cent,
    model: {
      scale: threeD.scale,
      uri: threeD.uri
    }
  });
layers.add(threeD.image);
threeD.image.show=false;

  threeD.parent.show=false;
  current = threeD;


}

function launch(model) {

  if (BuildingsIsON) {
    create(model);
  }

  if (IkonosIsOn){
    ikonos(model);
  }

  if (TerrainIsOn) {
    TerrainBuild(model);
  }
  if (GISisOn) {
    jsonLayOut(model, current_mode);
  }

  current = model;
  flyto(model);
}




function moding(mode) {


  if (current_mode != mode) {

    layers.remove(mode.other,false);
    layers.add(mode.source);

    viewer.dataSources.removeAll();
  }

  if (IkonosIsOn) {

    ikonos(current);
  }

  if (GISisOn) {
    jsonLayOut(current, mode);
  }
  current_mode = mode;
  return current_mode;
}


function jsonLayOut(model, mode) {
if (model!=current || !GISisOn || mode !=current_mode) {


  viewer.dataSources.removeAll();



  viewer.dataSources.add(Cesium.GeoJsonDataSource.load(model.buildings, mode.buildings));
  viewer.dataSources.add(Cesium.GeoJsonDataSource.load(model.archeo, mode.archeo));
  viewer.dataSources.add(Cesium.GeoJsonDataSource.load(model.road, mode.road));
  viewer.dataSources.add(Cesium.GeoJsonDataSource.load(model.forest, mode.forest));
  viewer.dataSources.add(Cesium.GeoJsonDataSource.load(model.stone, mode.stone));
  //viewer.dataSources.add(Cesium.GeoJsonDataSource.load(model.stone_2,mode.stone_2));
  viewer.dataSources.add(Cesium.GeoJsonDataSource.load(model.river, mode.river));
}
  GISisOn = true;
  return GISisOn;
}


function TerrainBuild(model) {
  if (model != current) {

    viewer.dataSources.removeAll();
  }
  viewer.terrainProvider = model.terrainProvider;
  TerrainIsOn = true;
  return TerrainIsOn;
}


function ikonos(model) {

  if (model != current) {
    model.other_image.show = false ;

  }
  model.image.show=true;
  layers.raiseToTop(model.image);
  IkonosIsOn = true;
  return IkonosIsOn;


}


function create(model) {
  m = model.other;
  p = model.parent;
  m.show = false;
  p.show = true;
  BuildingsIsON=true;
  return BuildingsIsON;

}

// sending the request using the picked object id
function get_description(id, onsuccess) {

  var url = 'http://207.154.237.111:3000/buildings/' + id;
  var query = {};
  var type = 'get';
  var content_type = "application/json; charset=utf-8";
  var data = JSON.stringify(query);

  jQuery.ajax({
    url: url,
    type: type,
    contentType: content_type,
    data: data,
    success: function(response) {
      // response
      console.log(response);
      console.log('set info box with this description: ' + response.description);
      onsuccess(response.description, response.image_url);
    },
    error: function(data) {
      // error
      console.log(`Error: ${data}`);
    }
  });
}

// enable this to see coordinates of the picked object

var labelEntity = viewer.entities.add({
    label : {
        show : false,
        showBackground : true,
        font : '14px monospace',
        horizontalOrigin : Cesium.HorizontalOrigin.LEFT,
        verticalOrigin : Cesium.VerticalOrigin.TOP,
        pixelOffset : new Cesium.Cartesian2(15, 0)
    }
});




handler.setInputAction(function(movement) {
  var foundPosition = false;
  var cartesian = scene.pickPosition(movement.position);
  var pickedObject = scene.pick(movement.position);


  if (Cesium.defined(pickedObject)) {
    closeNav();
    if (Cesium.defined(pickedObject.node) && Cesium.defined(pickedObject.mesh)) {


      var primitive = pickedObject.primitive;

      var id = pickedObject.node.name;
      var page = get_description(id, function(description, image_url) {

        var entity_1 = new Cesium.Entity({
          name: "THIS IS Object NO " + "'" + id + "'"
        });
        var des = description;

        //setting the infoboxcontent


        entity_1.description = `
     <div>
     <img
     width="50%"
     style="margin: 0 1em 1em 0;"
     src="${image_url}"/>
     <div>
     Description
     </div>
     <div>
     <p>
     ${des}
     </p>
     </div>
     <div>
     <a href='update.html?id=${id}' target=_blank>Update Description</a>
     </div>
     </div>
     `;

        viewer.selectedEntity = entity_1;

      });


      if (Cesium.defined(cartesian)) {
          var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);
          var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);
          var heightString = cartographic.height.toFixed(3);

          labelEntity.position = cartesian;
          // labelEntity.show=true;
          labelEntity.label.show = true;
          labelEntity.label.text =
              'Lon: ' + ('   ' + longitudeString).slice(-7) + '\u00B0' +
              '\nLat: ' + ('   ' + latitudeString).slice(-7) + '\u00B0' +
              '\nAlt: ' + ('   ' + heightString).slice(-7) + 'm';



          labelEntity.label.eyeOffset = new Cesium.Cartesian3(0.0, 0.0, camera.frustum.near * 1.5 - Cesium.Cartesian3.distance(cartesian, camera.position));

          foundPosition = true;
      }









      // var meshh = pickedObject.mesh._materials;
      // var r =[];
      // var newOne =  primitive.getMaterial('Material.18');
      // r.push(newOne);
      // r=meshh;
      // console.log(meshh);
      // console.log(r);





    }



  }  else {
            labelEntity.label.show = false;
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
