import $ from 'jquery'
import setCity from "./index"

export default function renderWeather(){
    document.querySelector("#citysearch").innerHTML = "";
    var APIKey = "9ba884c10ca90d0ca1f8f0ec657c12b7"
    var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + setCity() + "&appid=" + APIKey;
    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + setCity() + "&appid=" + APIKey;
    
    function urlExists(queryURL1, callback) {
      fetch(queryURL1, { method: 'head' })
      .then(function(status) {
        callback(status.ok)
      });
    }
    
    let url = 'https://mapsengine.google.com/map/embed?mid=zGLD-nMIJQAg.k0gTyNlOPz_Q';
    
    urlExists(queryURL1, function(exists) {
      if (exists) {
        return // it exists, do something
      } else {
        alert("Try a different city or spelling.")
      }
    });
  
    $.ajax({
        url: queryURL1,
        method: "GET"
      })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(".tempF").text("Temperature (F) " + tempF.toFixed(2));
        $(".tempF").text("Temperature: " + tempF.toFixed(2) + " °F");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".wind").text("Wind speed: " + (response.wind.speed*2.236936).toFixed(1) + " MPH"); //m per sec to mph
        var lon = response.coord.lon;
        var lat = response.coord.lat;
        var queryURL3 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
        $.ajax({
          url: queryURL3,
          method: "GET"
        })
        .then(function(response){
            var uvIndex = response.value;
            $("#UV").text(uvIndex);
            setUVColor();
            function setUVColor(){
              if (8<uvIndex) {
                $("#UV").css({"background-color": "red"});
              } else if (6<uvIndex && uvIndex<=8) {
                $("#UV").css({"background-color": "orange"});
              } else if (3<uvIndex && uvIndex<=6) {
                $("#UV").css({"background-color": "yellow"});
              } else {
                $("#UV").css({"background-color": "green"});
              }
            }
        });
        document.querySelector("#bigcity").innerHTML = response.name + " ";
        var mainIcon = 'https://openweathermap.org/img/wn/' + response.weather[0].icon + '.png';
        $("#mainIcon").empty();
        $("#mainIcon").append("<img src=" + mainIcon + ">");
    });
    //for these, each response.list item goes +3 hours, hence 5, 13, 21, 29, 37
    $.ajax({
      url: queryURL2,
      method: "GET"
    })
    .then(function(response) {
      function pullTemp(listIndex) {
        var tempF = (response.list[listIndex].main.temp - 273.15) *1.80 + 32;
        return tempF;
      }
      //format date into mm/dd/yy. substr is (start, length)
      //values for listIndex are given by when we run PullDate at the "add forecast date to html" section
      function pullDate(listIndex) {
        var dateFlipper = response.list[listIndex].dt_txt;
        var mm = dateFlipper.substr(5, 2);
        var dd = dateFlipper.substr(8, 2);
        removeZero();
        function removeZero() {
          var digitOne = dd.charAt(0);
          var digitTwo = dd.charAt(1);
          if (digitOne==='0'){
            digitOne='';
            return dd=digitOne+digitTwo
          }
          return dd
        }
        var yyyy = dateFlipper.substr(0, 4);
        return mm+"/"+removeZero()+"/"+yyyy;
      }
      var i;
      for(i = 0; i < 5; i++) {
        var dateid = "#fc-dt" + (i + 1);
        $(dateid).text(pullDate(5+8*i));
      }
      //`pullTemp(5+8*i)` gets temps for all next 5 days. remember, response.list[] begins at [5]
      for(i = 0; i < 5; i++) {
        var dateid = "#fc-temp" + (i + 1); //runs through all 5 HTML temp divs
        var smallIcon = 'https://openweathermap.org/img/wn/' + response.list[5+8*i].weather[0].icon + '.png';
        $(dateid).text("Temp: " + pullTemp(5+8*i).toFixed(2) + " °F"); //toFixed(2) makes it 2 decimal places
        $("#smallIcon" + (i + 1)).empty();
        $("#smallIcon" + (i + 1)).prepend("<img src=" + smallIcon + ">");
      } 
      //add forecast humidity to html
      for(i = 0; i < 5; i++) {
        var dateid = "#fc-humid" + (i + 1); //runs through all 5 HTML humidity divs
        $(dateid).text("Humidity: " + response.list[5+8*i].main.humidity + "%");
      }
    });
  }