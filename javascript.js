var btcNow = null;
var btcMin = null;
var btcMax = null;
var btcNowPrice = 0;
var btcMinPrice = 0;
var btcMaxPrice = 0;

var ethNow = null;
var ethMin = null;
var ethMax = null;
var ethNowPrice = 0;
var ethMinPrice = 0;
var ethMaxPrice = 0;

function setDefaultDisplay(obj) {
  obj.sevenSeg({
    digits: 5,
    value: 0, 
    colorOff: "#7d7d7d",
    colorBackground: "#828882",
    colorOn: "Black",
    decimalPoint: false
  });
}

function initializeBitcoinPrices() {
  $.get('https://api.coinmarketcap.com/v1/ticker/bitcoin/', function(response) {
    btcNowPrice = parseInt(response[0].price_usd);
    btcMinPrice = btcNowPrice;
    btcMaxPrice = btcNowPrice;
    btcNow.sevenSeg({
      value: btcNowPrice
    });
    btcMin.sevenSeg({
      value: btcMinPrice
    });
    btcMax.sevenSeg({
      value: btcMaxPrice
    });
  });
}

function updateBitcoinPrices() {
  $.get('https://api.coinmarketcap.com/v1/ticker/bitcoin/', function(response) {
    btcNowPrice = parseInt(response[0].price_usd);
    btcNow.sevenSeg({
      value: btcNowPrice
    });
    btcMin.sevenSeg({
      value: Math.min(btcMinPrice, btcNowPrice)
    });
    btcMax.sevenSeg({
      value: Math.max(btcMaxPrice, btcNowPrice)
    });
  });
}

function initializeEthereumPrices() {
  $.get('https://api.coinmarketcap.com/v1/ticker/ethereum/', function(response) {
    ethNowPrice = parseInt(response[0].price_usd);
    ethMinPrice = ethNowPrice;
    ethMaxPrice = ethNowPrice;
    ethNow.sevenSeg({
      value: ethNowPrice
    });
    ethMin.sevenSeg({
      value: ethMinPrice
    });
    ethMax.sevenSeg({
      value: ethMaxPrice
    });
  });
}

function updateEthereumPrices() {
  $.get('https://api.coinmarketcap.com/v1/ticker/ethereum/', function(response) {
    ethNowPrice = parseInt(response[0].price_usd);
    ethNow.sevenSeg({
      value: ethNowPrice
    });
    ethMin.sevenSeg({
      value: Math.min(ethMinPrice, ethNowPrice)
    });
    ethMax.sevenSeg({
      value: Math.max(ethMaxPrice, ethMaxPrice)
    });
  });
}

$(document).ready(function () {
  btcNow = $("#btc-main");
  btcMin = $("#btc-min");
  btcMax = $("#btc-max");

  setDefaultDisplay(btcNow);
  setDefaultDisplay(btcMin);
  setDefaultDisplay(btcMax);

  initializeBitcoinPrices();

  ethNow = $("#eth-main");
  ethMin = $("#eth-min");
  ethMax = $("#eth-max");
  
  setDefaultDisplay(ethNow);
  setDefaultDisplay(ethMin);
  setDefaultDisplay(ethMax);

  initializeEthereumPrices();

  setInterval(function() {
    updateBitcoinPrices();
    updateEthereumPrices();
  }, 300000); // update prices every 5 minutes

});
