$(document).ready(function() {

  endpoint = 'latest';
  access_key = config.MY_KEY;
  urlLink = 'http://data.fixer.io/api/' + endpoint + '?access_key=' + access_key
  var composedData

  $('#search').on( 'click', function(e){
    e.preventDefault();
    $.get(urlLink, recievedData);
    function recievedData(data){
      composedData = data;
      console.log(data)

      //time and date formatting
      let timeStamp = data.timestamp;
      var date = new Date(timeStamp*1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      var timeFormatted = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      let dateStamp = data.date;

      let timeDateStamp =`<p>Rates taken at ${timeFormatted} on the ${dateStamp} </p>`;
      $('#insertTimeDate').append(timeDateStamp);

      var rateGBP = data.rates.GBP;
      $('#GBP').val(rateGBP);
      var rateNZD = data.rates.NZD;
      $('#NZD').val(rateNZD);
      var rateCAD = data.rates.CAD;
      $('#CAD').val(rateCAD);
      var rateUSD = data.rates.USD;
      $('#USD').val(rateUSD);
    };
  });

  $('#calculate').on('click', function(e){
	e.preventDefault();
  console.log(composedData);
  //(euro / from currnecy)*to currency = conversion
  let fromRate = $('#fromCurrency').val().toString();
  let initialRate = 1 / composedData.rates[fromRate];
  console.log(initialRate);

  let toRate = $('#toCurrency').val().toString();
  let conversionRate = initialRate * composedData.rates[toRate];
  console.log(conversionRate);

  let totalValue = conversionRate * $('#amountValue').val();
  $('#totalValue').val(totalValue);

  });



});
