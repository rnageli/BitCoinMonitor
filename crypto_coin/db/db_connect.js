var mysql = require('mysql');
var con;
var dbConnect = () =>{
    con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ulteria",
    database: "test"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  return true;
}

var insertPrices = (buyPrice, sellPrice, spotPrice) => {
  var sql = `INSERT INTO bitcoin_prices (Timestamp, BuyPrice, SellPrice, SpotPrice) VALUES (CURRENT_TIMESTAMP,'${buyPrice}', '${sellPrice}', '${spotPrice}')`;

  con.query(sql, function (err, result) {
  if (err) throw err;
    console.log("1 record inserted");
  });
};

var getPrices = (fromTime, toTime, callback) => {
     console.log('inside getprices');
    var sql = "select * from bitcoin_prices WHERE Timestamp BETWEEN ? AND ?";
    var inserts = [fromTime, toTime];
    sql = con.format(sql, inserts);
    console.log( "sql command: " +sql);
     try{
         con.query(sql, function (error, results, fields) {
           if(error){
               console.log('Error retrieving top from the db: '+error);
               callback(err,null);
           }else{
               //console.log('results'+JSON.stringify(results));
               //console.log('fields'+JSON.stringify(fields));
               callback(null,results);
           }
         });
    }catch(e){
         console.log('Error in sql query exec '+e.message);
    }
}

module.exports = {
  'connect'   : dbConnect,
  'insert'    : insertPrices,
  'getPrices' : getPrices
}
