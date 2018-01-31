function setDefaultDisplay(obj) {
  console.log(obj);
  obj.sevenSeg({
    digits: 5,
    value: 1876, 
    colorOff: "#7d7d7d",
    colorBackground: "#828882",
    colorOn: "Black",
    decimalPoint: false
  });
  console.log(obj);
}

$(document).ready(function () {
  var bitcoinNow = $("#btc-main");
  var bitcoinMin = $("#btc-min");
  var bitcoinMax = $("#btc-max");
  setDefaultDisplay(bitcoinNow);
  setDefaultDisplay(bitcoinMin);
  setDefaultDisplay(bitcoinMax);

  var ethNow = $("#eth-main");
  var ethMin = $("#eth-min");
  var ethMax = $("#eth-max");
  setDefaultDisplay(ethNow);
  setDefaultDisplay(ethMin);
  setDefaultDisplay(ethMax);

  $.get('https://blockchain.info/tobtc?currency=USD&value=1', function(response) {
    var price = parseInt(1/parseFloat(response));    
    bitcoinNow.sevenSeg({
      value: price
    });
  });

  setInterval(function() {
    $.get('https://blockchain.info/tobtc?currency=USD&value=1', function(response) {
      var price = parseInt(1/parseFloat(response));
      bitcoinNow.sevenSeg({
	value: price
      });
    });
  }, 60000);


  bitcoinMin.sevenSeg({
    value: 10076, 
  });

  bitcoinMax.sevenSeg({
    value: 10299, 
  });

});
