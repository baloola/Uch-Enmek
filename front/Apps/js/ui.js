
var jj=false;



$(document).ready(function() {
  jj=true;
  tog();
  render(tuekta);
  render(karakol);
  launch(karakol);

});


function toggle() {
  if (jj) {
      labelEntity.label.show=false;
    viewer.selectedEntity = undefined;
    tog();

  }

}


function tog() {
  if (open) {
    closeNav();
  } else {
    openNav();
  }

}

function openNav() {
  document.getElementById("mySidenav").style.width = "300px";
  open = true;
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  open = false;
}

function GIScheck() {

  if (document.getElementById("GIS").checked) {
    jsonLayOut(current, current_mode);
  } else {
    GISisOn = false;
    viewer.dataSources.removeAll();
    return GISisOn;
  }

}

function TerrainCheck() {
  if (document.getElementById("terrain").checked) {
    TerrainBuild(current);
  } else {
    viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider();
    TerrainIsOn = false;
    return TerrainIsOn;
  }
}
function IkonosCheck() {
  if (document.getElementById("ikonos").checked) {
    ikonos(current);
  } else {
    current.other_image.show=false;
    current.image.show=false;
    IkonosIsOn = false;
    return IkonosIsOn;

}
}
function buildingcheck() {
  if (document.getElementById("Buildings").checked) {
  create(current);
  } else {
    t.show=false;
    k.show=false;
    BuildingsIsON=false;
    return BuildingsIsON;
}
}


function grave() {
  document.getElementById("kurgans").style.visibility= "visible";
  toggle();
  jj=false;
  launch(karakol);
  create(karakol);
  setviewer();
  kurgan();
  if(TerrainIsOn){
    document.getElementById("terrain").checked=false;
    viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider();
    TerrainIsOn = false;
    return TerrainIsOn;

  }


}

function back() {
  labelEntity.label.show=false;
viewer.navigationHelpButton.container.hidden=false;
viewer.selectedEntity = undefined;
  document.getElementById("kurgans").style.visibility= "hidden";

  reset();
  buildingcheck();

  jj=true;
}

document.getElementById("osm").addEventListener('click', function() {
  moding(osm);
}, false);
document.getElementById("bing").addEventListener('click', function() {
  moding(bing);
}, false);
document.getElementById("tuekta").addEventListener('click', function() {
  launch(tuekta);
}, false);
document.getElementById("karakol").addEventListener('click', function() {
  launch(karakol);
}, false);


document.getElementById("grave").addEventListener('click', function() {

grave();

}, false);
