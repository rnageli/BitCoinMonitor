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

var getPrices = (rows,callback) => {
    var sql = "select * from bitcoin_prices LIMIT ?";
    con.query(sql, [rows], function (error, results, fields) {
      if(error){
          console.error('Error retrieving top '+rows+'from the db: '+error);
          callback(err,null);
      }else{
          //console.log('results'+JSON.stringify(results));
          //console.log('fields'+JSON.stringify(fields));
          callback(null,results);
      }
    });
}

module.exports = {
  'connect'   : dbConnect,
  'insert'    : insertPrices,
  'getPrices' : getPrices
}
