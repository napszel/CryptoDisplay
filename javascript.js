var noSleep = new NoSleep();

var btcNowDisp = null;
var btcMinDisp = null;
var btcMaxDisp = null;
var btcNowPrice = 0;
var btcMinPrice = 3775;
var btcMaxPrice = 19382;

var ethNowDisp = null;
var ethMinDisp = null;
var ethMaxDisp = null;
var ethNowPrice = 0;
var ethMinPrice = 108;
var ethMaxPrice = 1400;

function setUp(displays) {
  var obj;
  for (obj of displays) {
    obj.sevenSeg({
      digits: 5,
      value: 0, 
      colorOff: "#7d7d7d",
      colorBackground: "#828882",
      colorOn: "Black",
      decimalPoint: false
    });
  }
}

function updateDisplay(display, price) {
  display.sevenSeg({
    value: price
  })
}

function updateBitcoinPrices() {
  $.get('https://blockchain.info/tobtc?currency=USD&value=1', function(response) {
    btcNowFloat = 1 / parseFloat(response)
    btcNowPrice = parseInt(btcNowFloat);
    btcMinPrice = Math.min(btcMinPrice, btcNowPrice);
    btcMaxPrice = Math.max(btcMaxPrice, btcNowPrice);

    updateDisplay(btcNowDisp, btcNowPrice);
    updateDisplay(btcMinDisp, btcMinPrice);
    updateDisplay(btcMaxDisp, btcMaxPrice);
  });
}

function updateEthereumPrices() {
  $.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD', function(response) {
    ethNowPrice = parseInt(response["ethereum"]["usd"]);
    ethMinPrice = Math.min(ethMinPrice, ethNowPrice);
    ethMaxPrice = Math.max(ethMaxPrice, ethNowPrice);

    updateDisplay(ethNowDisp, ethNowPrice);
    updateDisplay(ethMinDisp, ethMinPrice);
    updateDisplay(ethMaxDisp, ethMaxPrice);
  });
}

function enableNoSleep() {
  noSleep.enable();
//  document.removeEventListener('click', enableNoSleep, false);
}

$(document).ready(function () {
  document.addEventListener('click', enableNoSleep, false);

  btcNowDisp = $("#btc-main");
  btcMinDisp = $("#btc-min");
  btcMaxDisp = $("#btc-max");
  ethNowDisp = $("#eth-main");
  ethMinDisp = $("#eth-min");
  ethMaxDisp = $("#eth-max");

  setUp([btcNowDisp, btcMinDisp, btcMaxDisp, ethNowDisp, ethMinDisp, ethMaxDisp]);

  updateDisplay(btcMinDisp, btcMinPrice);
  updateDisplay(btcMaxDisp, btcMaxPrice);
  updateBitcoinPrices();
  
  updateDisplay(ethMinDisp, ethMinPrice);
  updateDisplay(ethMaxDisp, ethMaxPrice);
  updateEthereumPrices();

  setInterval(function() {
    updateBitcoinPrices();
    updateEthereumPrices();
  }, 300000); // 300 000 ms = update prices every 5 minutes

});
