import $ from "jquery";
// localStorage.setItem("test", "test")
console.log(localStorage)

function displayCityInfo() {
  var city = $(this).attr("data-name");
  var APIKey = "9ba884c10ca90d0ca1f8f0ec657c12b7"
  var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  $.ajax({
    url: queryURL1,
    method: "GET"
  }).then(function(response) {
    console.log(JSON.stringify(response));
  });
}