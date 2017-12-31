var Client = require('coinbase').Client;
var client = new Client({'apiKey': 'TflrnkJC4jgdwfGr',
                         'apiSecret': 'AKLQ9KqxeKlRljhp3Gsj31LY0cGlH7DG'});

var buyPrice;
var spotPrice;
var sellPrice;

fetchPrices();



    function fetchPrices(){
    console.log('------------------------------------------------');
    client.getBuyPrice({'currencyPair': 'BTC-USD'}, function(err, price) {
    //console.log('buy price '+price.data.amount);
    if(err){
      console.log('buy error')
    }
    buyPrice = price.data.amount;
    });

    client.getSpotPrice({'currencyPair': 'BTC-USD'}, function(err, price) {
    var stringPrice = JSON.stringify(price);
    //console.log('spot price '+price.data.amount);
    spotPrice = price.data.amount;
    });

    client.getSellPrice({'currencyPair': 'BTC-USD'}, function(err, price) {
    var stringPrice = JSON.stringify(price);
    //console.log('sell price '+price.data.amount);
    sellPrice = price.data.amount;
    });

    setTimeout(displayPrices, 2000);
}

function displayPrices(){
  console.log('Buy Price: '+buyPrice);
  console.log('Sell Price: '+sellPrice);
  console.log('Spot Price: '+spotPrice);
}
