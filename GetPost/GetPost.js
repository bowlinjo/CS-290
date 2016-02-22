

var http = require('http');
var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function(req,res){
  res.type('text/plain');
  res.send('Welcome to the main page!');
});

app.get('/checker',function(req,res){
  var getData = [];
  for (var p in req.query){
    getData.push({'name':p, 'value':req.query[p]});
    }
  var context = {};
  context.dataList = getData;
  res.render('checkerGet', context);
});

app.post('/checker',function(req,res){
  var pushData = [];
  for (var p in req.body){
    pushData.push({'name':p, 'value':req.body[p]})
	}
  for (var p in req.query){
    pushData.push({'name':p, 'value':req.query[p]})
	}
  var context = {};
  context.dataList = pushData;
  res.render('checkerPost', context);
});

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
