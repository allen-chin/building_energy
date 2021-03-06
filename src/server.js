var http = require("http");
var fs = require("fs");
var express = require("express");
var events = require("events");
var url = require("url");
var PythonShell = require('python-shell');
var options = {
  mode: 'text',
  pythonPath: 'C:/Users/zeusa/Anaconda2/python.exe',//change pythonPath to your pc's python path
  pythonOptions: ['-u','-W ignore']
};
var path = require("path");
var app = express();
app.use(express.static('../web interface demo v1'));

app.get('/', function(req, res){
  res.sendFile(__dirname + "/../" + "web interface demo v1/index.html");
});

app.get('/BuildingSensors.csv', function(req, res){
  res.sendFile(path.resolve(__dirname+'/../data/BuildingSensors.csv'));
});

app.get('/python.json', function(req, res){
	console.log(req.query);
	options['args'] = Object.keys(req.query).map(function(key){ return req.query[key]; });
  PythonShell.run('mv_model.py', options, function(err, results) {
  	if (err) {
      console.log(err.stack);     
      res.json({error:err.stack});
    }
    else{
      console.log("Completed.");
      res.json(results);
    }
  });
});

var port = 8000;
app.listen(port);

console.log('Server running at port '+ port);
