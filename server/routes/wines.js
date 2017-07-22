var mongo = require('mongodb');

var Server = mongo.Server,
  Db = mongo.Db;

var server = new Server('localhost', 27017, {
  auto_reconnect: true
});
db = new Db('tuektadb', server);

db.open(function(err, db) {
  if (!err) {
    console.log("Connected to 'buildings' database");
    db.collection('buildings', {
      strict: true
    }, function(err, collection) {
      if (err) {
        console.log("The 'buildings' collection doesn't exist. Creating it with sample data...");
        populateDB();
      }
    });
  } else {
    console.log("Cannot connect to tuektadb database");
  }
});

exports.findById = function(req, res) {
  var id = req.params.id;
  console.log('Retrieving building description: ' + id);
  db.collection('buildings', function(err, collection) {
    collection.findOne({
      'object_id': id
    }, function(err, item) {
      res.send(item);
    });
  });
};


exports.updateBuildingDescription = function(req, res) {
  var id = req.params.id;
  var building = req.body;
  console.log(req.params);
  console.log('Updating building: ' + id);
  console.log(JSON.stringify(building));
  db.collection('buildings', function(err, collection) {
    if (err) {
      console.log('Error while opening collection buildings: ' + err)
    } else {
      collection.findOne({
        'object_id': id
      }, function(err, item) {
        item.description = building.description;
        item.image_url = building.image_url;
        collection.update({
          'object_id': id
        }, item, {
          safe: true
        }, function(err, result) {
          if (err) {
            console.log('Error updating building: ' + err);
            res.send({
              'error': 'An error has occurred'
            });
          } else {
            console.log('' + result + ' document(s) updated');
            res.send(building);
          }
        });
      });

    }
  });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
  var fs = require('fs');
  var obj,ds;
  var files = ['data/kara_arch.geojson','data/kara_build.geojson','data/tuek_build.geojson','data/indoor.json'];
  for (var i = 0; i < files.length; i++) {
  ds=files[i];

  fs.readFile(ds, 'utf8', function(err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    var buildings = []
    for (var index = 0; index < obj.features.length; index++) {
      item = obj.features[index];
      object = {
        object_id: item.properties.id,
        description: item.properties.ClassCode,
        image_url: 'data/tuekta/house.jpg'
      }
      buildings[index] = object
    }
    db.collection('buildings', function(err, collection) {
      collection.insert(buildings, {
        safe: true
      }, function(err, result) {
        if (err) {
          console.log("something is wrong man!!");
        }
      });
    });

  });
}
};
