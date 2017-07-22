
var express = require('express'),
    wine = require('./routes/wines');
var path = require('path')
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();


app.configure(function () {
   // app.use(allowManyDomains);
	  app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(cors());
	  app.use(bodyParser.json());
});

app.get('/', function(req, res) {

	 res.sendfile(path.join(__dirname + '/index.html'));

});


app.get('/buildings/:id', wine.findById);
app.put('/buildings/:id', wine.updateBuildingDescription);

app.listen(3000, '0.0.0.0');
console.log('Listening on port 3000...');
