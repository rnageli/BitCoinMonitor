var Client = require('coinbase').Client;
var client = new Client({'apiKey': 'TflrnkJC4jgdwfGr',
                         'apiSecret': 'AKLQ9KqxeKlRljhp3Gsj31LY0cGlH7DG'});
var http = require('http');
var db = require('./db/db_connect.js');
var async = require('async-waterfall');

const options = {

};

http.createServer((req, res) => {
  res.writeHead(200,{"content-Type":"text/html","Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"});
  //console.log(req.url+' This is the request data');
  async([function(callback){
        db.getPrices(1000, function(err,data){
          if(data){
                callback(null,data);
          }
        });
    }],
    function(err,response){
      console.log('----------------faefa---------------');
      if(err){
        console.log('waterfall returned error '+err);
      }else{
        //console.log(JSON.stringify(response));
        res.write(JSON.stringify(response),"UTF-8");
        res.end();
      }
    });
  /*var data = db.getPrices(10);

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

  }*/
}).listen(8080);


if (db) {
    db.connect();
} else {
    console.log('failed require');
}
