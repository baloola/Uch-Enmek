var jj = false;
var mq = window.matchMedia("(min-width: 765px)");

$(document).ready(function () {
  jj = true;
  tog();
  render(tuekta);
  render(karakol);
  uch();

});


function toggle() {
  if (jj) {
    labelEntity.label.show = false;
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
  document.getElementById('mySidenav').style.width = '300px';
  open = true;
}

function closeNav() {
  document.getElementById('mySidenav').style.width = '0';
  open = false;
}



function draw(T_layer) {
  if (!uchIsOn) {
    var lay = current[T_layer];
    var leg = document.getElementById(T_layer).checked;
    show()
    for (var i = 0; i < lay.length; i++) {
      if (leg) {

        viewer.dataSources.add(lay[i]);
      } else {
        viewer.dataSources.remove(lay[i]);
      }
    }
  }
}



function IkonosCheck() {

  if (document.getElementById('ikonos').checked) {

    ikonos(current);
    IkonosIsOn = true;
  } else {
    if (!uchIsOn) {
      current.other_image.show = false;
      current.image.show = false;
    }
    IkonosIsOn = false;
  }
  return IkonosIsOn;
}

function buildingcheck() {
  if (document.getElementById('Buildings').checked) {
    if (!uchIsOn) {
      create(current);
    }
    BuildingsIsON = true;
  } else {
    t.show = false;
    k.show = false;
    if (BuildingsIsON) {
      viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider();
    }

    BuildingsIsON = false;
  }
  return BuildingsIsON;
}


function grave() {
  document.getElementById('kurgans').style.visibility = 'visible';
  toggle();
  jj = false;
  viewer.dataSources.remove(outline);
  viewer.dataSources.remove(park);
  uchIsOn = false;
  launch(karakol);
  create(karakol);
  hideDefaultBar();
  kurgan();
  viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider();

}

function back() {
  labelEntity.label.show = false;
  viewer.navigationHelpButton.container.hidden = false;
  viewer.selectedEntity = undefined;
  document.getElementById('kurgans').style.visibility = 'hidden';
  reset();
  buildingcheck();
  jj = true;
}





function show() {

  if (document.getElementById('manMade').checked || document.getElementById('arc').checked || document.getElementById('natural').checked) {
    if (mq.matches) {
      // window width is at least 500px
      document.getElementById('my-legend').style.left = '79%';
    } else {
      // window width is less than 500px
      document.getElementById('my-legend').style.left = '55%';
    }

    console.log('show')
  } else {
    document.getElementById('my-legend').style.left = '100%';
    console.log('hide');
  }


}
document.getElementById('osm').addEventListener('click', function () {
  moding(osm);
}, false);

document.getElementById('bing').addEventListener('click', function () {
  moding(bing);
}, false);

document.getElementById('topo').addEventListener('click', function () {
  moding(topo_image);
}, false);

document.getElementById('uch').addEventListener('click', function () {
  document.getElementById('Buildings').checked = false;

  buildingcheck();
  uch();
}, false);

document.getElementById('tuekta').addEventListener('click', function () {
  viewer.dataSources.remove(outline);
  viewer.dataSources.remove(park);
  uchIsOn = false;
  launch(tuekta);
}, false);

document.getElementById('karakol').addEventListener('click', function () {
  viewer.dataSources.remove(outline);
  viewer.dataSources.remove(park);
  uchIsOn = false;
  launch(karakol);
}, false);

document.getElementById('grave').addEventListener('click', function () {
  grave();

}, false);