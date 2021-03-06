/*eslint-env es6*/
/* exported model_im*/
/* exported other_im*/
/* exported karakol*/
/* exported tuekta*/
/* exported model_im*/
/* exported osm */
/* exported bing */
/* exported render */
/* exported uch */
/* exported launch */
/* exported moding */
/* exported osm */
/* exported osm */



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

viewer.extend(Cesium.viewerCesiumNavigationMixin, {});
viewer.infoBox.frame.sandbox = 'allow-same-origin allow-top-navigation allow-pointer-lock allow-popups allow-forms allow-scripts';
viewer.infoBox.frame.removeAttribute('sandbox');
viewer.scene.globe.depthTestAgainstTerrain = true;
viewer.scene.frameState.creditDisplay.addDefaultCredit(new Cesium.Credit('cesiumContainer', 'assets/images/tud-128x62.png ', 'https://tu-dresden.de/bu/umwelt/geo/ifk'));
viewer.scene.frameState.creditDisplay.addDefaultCredit(new Cesium.Credit('cesiumContainer', 'assets/images/geo.png', 'http://www.geoeyefoundation.org/'));

var scene = viewer.scene;
var camera = scene.camera;
var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
var logoUrl = 'data/billboards/goat.jpg';
var m, p, model_im, other_im, current,labelEntity,current_mode,t,k,outline,park,IkonosIsOn,BuildingsIsON,uchIsOn,kara_green,kara_archeo,tue_archeo,tue_green,kara_build,tue_build,kara_forest,tue_forest,kara_road,tue_road,kara_river,tue_river,kara_stone,tue_stone,kara_stone_2;


GISisOn = IkonosIsOn=BuildingsIsON=uchIsOn=false;

var layers = viewer.scene.imageryLayers;
var topo_image= new Cesium.ImageryLayer(new Cesium.SingleTileImageryProvider({
  url: 'data/imagery/topo_map.jpg',
  rectangle: Cesium.Rectangle.fromDegrees(85.6209426986409312,50.3921250959869140, 86.1110566586886108,50.9892180403075112)
}));
 t = k = viewer.entities.add(new Cesium.Entity());

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

var bing_source = new Cesium.ImageryLayer(new Cesium.BingMapsImageryProvider({
  url: 'https://dev.virtualearth.net'
}));


var osm_source = new Cesium.ImageryLayer(Cesium.createOpenStreetMapImageryProvider({
  url: 'https://a.tile.openstreetmap.org/'
}));
var laylay=[{name:'kara_archeo',path:'data/GIS/kara_archeo.geojson',fill:''},{name:tue_archeo, path:'data/GIS/tuek_archeo.geojson',fill:''},{name:tue_build ,path:'data/GIS/tuek_buildings.geojson',fill:''},{name:kara_green,path:'data/GIS/kara_green.json',fill:''},{name:tue_green,path:'data/GIS/tuek_green.json',fill:''},
{name:kara_build,path:'data/GIS/kara_buildings.geojson',fill:''},{name:kara_forest,path:'data/GIS/kara_forest.geojson',fill:''},{name:tue_forest,path:'data/GIS/tuek_forest.geojson',fill:''},{name:kara_road,path:'data/GIS/kara_road.geojson',fill:''},{name:tue_road,path:'data/GIS/tuek_road.geojson',fill:''},{name:kara_river,path:'data/GIS/kara_river.geojson',fill:''},{name:tue_river,path:'data/GIS/tuek_river.geojson',fill:''},
{name:kara_stone,path:'data/GIS/kara_stone.geojson',fill:''},{name:tue_stone,path:'data/GIS/tuek_stone.geojson',fill:''},{name:kara_stone_2,path:'data/GIS/kara_stone_2.geojson',fill:''}];
//  laylay.map(function (laylay) {
//    this[laylay.name]=5;
//     // laylay.name=new Cesium.GeoJsonDataSource();
//     // laylay.name.load(laylay.path,{fill:Cesium.Color.BLUE.withAlpha(0.3),clampToGround: true});
//     return  laylay.name;
// });


// outline.load('data/GIS/main_frame.json', {fill:Cesium.Color.BLUE.withAlpha(0.3),clampToGround: true});
// park.load('data/GIS/uch_enmek.json',{fill:Cesium.Color.RED.withAlpha(0.3),clampToGround: true});
// kara_green.load('data/GIS/kara_green.json',{fill:Cesium.Color.GREEN.withAlpha(0.3),clampToGround: true});
// kara_build.load('data/GIS/kara_buildings.geojson', {fill:Cesium.Color.DARKGREEN.withAlpha(0.3),clampToGround: true});
// kara_forest.load('data/GIS/kara_forest.geojson',{fill:Cesium.Color.DEEPPINK.withAlpha(0.3),clampToGround: true});
// kara_road.load('data/GIS/kara_road.geojson', {fill:Cesium.Color.ORANGERED.withAlpha(0.3),clampToGround: true});
// kara_river.load('data/GIS/kara_river.geojson',{fill:Cesium.Color.BLUE.withAlpha(0.3),clampToGround: true});
// kara_stone.load('data/GIS/kara_stone.geojson', {fill:Cesium.Color.DIMGREY.withAlpha(0.3),clampToGround: true});
// kara_stone_2.load('data/GIS/kara_stone_2.geojson',{fill:Cesium.Color.DARKGRAY.withAlpha(0.3),clampToGround: true});
// kara_archeo.load('data/GIS/kara_archeo.geojson', {fill:Cesium.Color.CRIMSON.withAlpha(0.3),clampToGround: true});
// tue_green.load('data/GIS/tuek_green.json',{fill:Cesium.Color.GREEN.withAlpha(0.3),clampToGround: true});
// tue_build.load('data/GIS/tuek_buildings.geojson', {fill:Cesium.Color.DARKGREEN.withAlpha(0.3),clampToGround: true});
// tue_forest.load('data/GIS/tuek_forest.geojson',{fill:Cesium.Color.DEEPPINK.withAlpha(0.3),clampToGround: true});
// tue_road.load('data/GIS/tuek_road.geojson', {fill:Cesium.Color.ORANGERED.withAlpha(0.3),clampToGround: true});
// tue_river.load('data/GIS/tuek_river.geojson',{fill:Cesium.Color.BLUE.withAlpha(0.3),clampToGround: true});
// tue_stone.load('data/GIS/tuek_stone.geojson', {fill:Cesium.Color.DIMGREY.withAlpha(0.3),clampToGround: true});
// tue_archeo.load('data/GIS/tuek_archeo.geojson', {fill:Cesium.Color.CRIMSON.withAlpha(0.3),clampToGround: true});

// outline=new Cesium.GeoJsonDataSource();
// park=new Cesium.GeoJsonDataSource();
// kara_frame=new Cesium.GeoJsonDataSource();
// kara_archeo=new Cesium.GeoJsonDataSource();
// tue_archeo=new Cesium.GeoJsonDataSource();
// tue_frame=new Cesium.GeoJsonDataSource();
// kara_green=new Cesium.GeoJsonDataSource();
// tue_green=new Cesium.GeoJsonDataSource();
// kara_build=new Cesium.GeoJsonDataSource();
// tue_build=new Cesium.GeoJsonDataSource();
// kara_forest=new Cesium.GeoJsonDataSource();
// tue_forest=new Cesium.GeoJsonDataSource();
// kara_road=new Cesium.GeoJsonDataSource();
// tue_road=new Cesium.GeoJsonDataSource();
// kara_river=new Cesium.GeoJsonDataSource();
// tue_river=new Cesium.GeoJsonDataSource();
// kara_stone=new Cesium.GeoJsonDataSource();
// tue_stone=new Cesium.GeoJsonDataSource();
// kara_stone_2= new Cesium.GeoJsonDataSource();




var karakol = {
  camera: {
    destination: Cesium.Cartesian3.fromDegrees(85.95115667356953, 50.78042115209972, 3079.575032013868),
    orientation: {
      heading: 0.0,
      pitch: Cesium.Math.toRadians(-35.0),
      roll: 0.0
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
  manMade:[kara_road,kara_build],
  natural:[kara_stone,kara_river,kara_green,kara_forest,kara_stone_2],
  arc:[kara_archeo]

};



var tuekta = {
  camera: {
    destination: Cesium.Cartesian3.fromDegrees(85.88276761171318, 50.81612402131404, 2787.550547062463),
    orientation: {
      heading: 0.0,
      pitch: Cesium.Math.toRadians(-35.0),
      roll: 0.0
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
  manMade:[tue_build,tue_road],
  natural:[tue_stone,tue_river,tue_green,tue_forest],
  arc:[tue_archeo]

};



var bing = {
  source: bing_source,
  other: osm_source,



};
var osm = {
  source: osm_source,
  other: bing_source
};



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

function uch() {
  if (!uchIsOn){
  viewer.dataSources.add(outline);
  viewer.dataSources.add(park);

}
var topo_camera= {
    destination: {x: 298421.54756878485, y: 4102622.049784298, z: 4985542.956093062}
  };
  moding(topo_image);
  viewer.camera.flyTo(topo_camera);
uchIsOn=true;
return uchIsOn;
}



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
  threeD.image.show = false;
  threeD.parent.show = false;
  current = threeD;


}

function launch(model) {



  if (BuildingsIsON) {
    create(model);
  }

  if (IkonosIsOn) {
    ikonos(model);
  }

  // if (GISisOn) {
  //   layouTheme(model,layer,state);
  // }

  current = model;
  flyto(model);
}




function moding(mode) {


if (current_mode != mode) {

    if (current_mode=topo_image){

      layers.remove(topo_image, false);
    }

  if (!mode.source||!mode.other){

      layers.add(topo_image);
  }else{
      layers.remove(mode.other,false);
      layers.add(mode.source);


}
if (IkonosIsOn) {
    ikonos(current);
}
current_mode = mode;
return current_mode;
  }
}


// function jsonLayOut(model) {
//   if (model != current || !GISisOn ) {
//
//     viewer.dataSources.removeAll();
//     viewer.dataSources.add(Cesium.GeoJsonDataSource.load(model.buildings, style.buildings));
//     viewer.dataSources.add(Cesium.GeoJsonDataSource.load(model.archeo, style.archeo));
//     viewer.dataSources.add(Cesium.GeoJsonDataSource.load(model.road, style.road));
//     viewer.dataSources.add(Cesium.GeoJsonDataSource.load(model.forest, style.forest));
//     viewer.dataSources.add(Cesium.GeoJsonDataSource.load(model.stone, style.stone));
//     //viewer.dataSources.add(Cesium.GeoJsonDataSource.load(model.stone_2,style.stone_2));
//     viewer.dataSources.add(Cesium.GeoJsonDataSource.load(model.river, style.river));
//   }
//   GISisOn = true;
//   return GISisOn;
// }


function TerrainBuild(model) {
  if (model != current) {

    viewer.dataSources.removeAll();
  }
  viewer.terrainProvider = model.terrainProvider;

}






function ikonos(model) {

  if (model != current) {
    model.other_image.show = false;

  }
  model.image.show = true;
  layers.raiseToTop(model.image);
  IkonosIsOn = true;
  return IkonosIsOn;


}


function create(model) {
  m = model.other;
  p = model.parent;
  m.show = false;
  p.show = true;
  TerrainBuild(model);
  BuildingsIsON = true;
  return BuildingsIsON;

}

// sending the request using the picked object id
function get_description(id, onsuccess) {

  var url = 'http://207.154.237.111:3000/buildings/' + id;
  var query = {};
  var type = 'get';
  var content_type = 'application/json; charset=utf-8';
  var data = JSON.stringify(query);

  jQuery.ajax({
    url: url,
    type: type,
    contentType: content_type,
    data: data,
    success: function(response) {
      // response
      onsuccess(response.description, response.image_url);
    },
    error: function(data) {
      // error

    }
  });
}

// enable this to see coordinates of the picked object

labelEntity = viewer.entities.add({
  label: {
    show: false,
    showBackground: true,
    font: '14px monospace',
    horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
    verticalOrigin: Cesium.VerticalOrigin.TOP,
    pixelOffset: new Cesium.Cartesian2(15, 0)
  }
});




handler.setInputAction(function(movement) {
  // var foundPosition = false;
  var cartesian = scene.pickPosition(movement.position);
  var pickedObject = scene.pick(movement.position);


  if (Cesium.defined(pickedObject)) {
    closeNav();
    if (Cesium.defined(pickedObject.node) && Cesium.defined(pickedObject.mesh)) {




      var id = pickedObject.node.name;
       get_description(id, function(description, image_url) {

        var entity_1 = new Cesium.Entity({
          name: 'THIS IS Object NO ' + '"' + id + '"'
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
     <a href="update.html?id=${id}" target=_blank>Update Description</a>
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
        labelEntity.label.show = true;
        labelEntity.label.text =
          'Lon: ' + ('   ' + longitudeString).slice(-7) + '\u00B0' +
          '\nLat: ' + ('   ' + latitudeString).slice(-7) + '\u00B0' +
          '\nAlt: ' + ('   ' + heightString).slice(-7) + 'm';



        labelEntity.label.eyeOffset = new Cesium.Cartesian3(0.0, 0.0, camera.frustum.near * 1.5 - Cesium.Cartesian3.distance(cartesian, camera.position));

        // foundPosition = true;
      }



      // TODO: highlight material on event
      // var primitive = pickedObject.primitive;
      // var meshh = pickedObject.mesh._materials;
      // var r =[];
      // var newOne =  primitive.getMaterial('Material.18');
      // r.push(newOne);
      // r=meshh;
      // console.log(meshh);
      // console.log(r);





    }



  } else {
    // foundPosition = false;
    labelEntity.label.show = false;
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
