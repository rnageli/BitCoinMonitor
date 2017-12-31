var Client = require('coinbase').Client;
var client = new Client({'apiKey': 'TflrnkJC4jgdwfGr',
                         'apiSecret': 'AKLQ9KqxeKlRljhp3Gsj31LY0cGlH7DG'});
var http = require('http');
var db = require('./db/db_connect.js');
var async = require('async-waterfall');

var express = require('express');

var app = express();

app.get('/date',(req, res) => {
     console.log(req.query);
     res.set({
       'Content-Type': 'text/plain',
       'Access-Control-Allow-Origin': '*'
     });
     db.getPrices(req.query.from, req.query.to, function(err,data){
            console.log('----------------faefa---------------');
            if(err){
              console.log('waterfall returned error '+err);
            }else{

              var resp = JSON.stringify(data,undefined,2);
              console.log('resp');
              //console.log(resp);
              res.send(resp);
            }
     });
});

app.listen(1000);

/*http.createServer((req, res) => {
  res.writeHead(200,{"content-Type":"text/html","Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"});
  //console.log(req.url+' This is the request data');
        db.getPrices(1000, function(err,data){
               console.log('----------------faefa---------------');
               if(err){
                 console.log('waterfall returned error '+err);
               }else{
                   response.forEach(function(data){
                        var timestamp = data.Timestamp.toString();
                        data.Timestamp = timestamp.replace(/T/, ' ').replace(/\..+/, '');
                   });

                 var resp = JSON.stringify(data,undefined,2);
                 console.log('test');
                 //console.log(resp);
                 res.write(resp);
                 res.end();
               }
        });
  var data = db.getPrices(10);

  while(data == null)
  {
    if(data != null)
    {
      console.log(data+'received data ------------------' );
      //var data = db.getPrices(10);
      var testData = [10,12,15];
      res.end(testData.toString());
      break;
    }
    else {
      console.log("data is empty");
    }

  }
}).listen(8080);*/


if (db) {
    db.connect();
} else {
    console.log('failed require');
}
