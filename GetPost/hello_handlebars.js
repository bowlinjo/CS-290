
var express = require('express');

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res){
  res.render('home');
});

app.get('/other-page',function(req,res){
  res.type('text/plain');
  res.send('Welcome to the other page!');
});

function getRandNum() {
	var stuffToDisplay = {};
	stuffToDisplay.randNum = Math.random();
	return stuffToDisplay;
}

app.get('/random-number',function(req,res){
  res.render('randNum', getRandNum());
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