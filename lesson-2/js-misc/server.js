var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var id = 0;
var books = {};

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(3333);


