var Client = require('coinbase').Client;
var client = new Client({
    'apiKey': 'TflrnkJC4jgdwfGr',
    'apiSecret': 'AKLQ9KqxeKlRljhp3Gsj31LY0cGlH7DG'
});
var db = require('./db/db_connect.js');

var buyPrice;
var spotPrice;
var sellPrice;

if (db) {
    db.connect();
} else {
    console.log('failed require');
}

function fetchPrices() {
    console.log('------------------------------------------------');
    buyPrice = -1;
    sellPrice = -1;
    spotPrice = -1;
    client.getBuyPrice({
        'currencyPair': 'BTC-USD'
    }, function(err, price) {
        //console.log('buy price '+price.data.amount);
        if (err) {
            console.log('buy error: ' + JSON.stringify(err));
            console.log('data: ' + JSON.stringify(price));
        } else {
            buyPrice = price.data.amount;
        }
    });

    client.getSpotPrice({
        'currencyPair': 'BTC-USD'
    }, function(err, price) {
        var stringPrice = JSON.stringify(price);
        //console.log('spot price '+price.data.amount);
        if (err) {
            console.log('spot error: ' + JSON.stringify(err));
            console.log('data: ' + JSON.stringify(price));
        } else {
            spotPrice = price.data.amount;
        }
    });

    client.getSellPrice({
        'currencyPair': 'BTC-USD'
    }, function(err, price) {
        var stringPrice = JSON.stringify(price);
        //console.log('sell price '+price.data.amount);
        if (err) {
            console.log('sell error: ' + JSON.stringify(err));
            console.log('data: ' + JSON.stringify(price));
        } else {
            sellPrice = price.data.amount;
        }
    });

    setTimeout(insertIntoDB, 2000);
}

setInterval(fetchPrices, 10000);

function insertIntoDB() {
    if (sellPrice != -1 && buyPrice != -1 && spotPrice != -1) {
        db.insert(buyPrice, sellPrice, spotPrice)
    }
}


function displayPrices() {
    var buySpotDiff = buyPrice - spotPrice;
    var sellSpotDiff = spotPrice - sellPrice;

    /*console.log('buy - spot '+buySpotDiff);
    console.log('buy - spot (spot is base)'+(buySpotDiff/spotPrice*100));
    console.log('buy - spot (buy is base)'+(buySpotDiff/buyPrice*100));
    console.log();*/

    //console.log('spot - sell '+sellSpotDiff);
    //console.log('spot - sell (spot is base)'+(sellSpotDiff/spotPrice*100));
    //console.log('spot - sell (sell is base)'+(sellSpotDiff/sellPrice*100));
    //console.log('test (buy is base)'+(sellSpotDiff/buyPrice*100));
    console.log('Buy Price: ' + buyPrice);
    console.log('Sell Price: ' + sellPrice);
    console.log('Spot Price: ' + spotPrice);
}
