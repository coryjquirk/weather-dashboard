function GetClock(){
  var d=new Date();
  var nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getFullYear();
  
  var clocktext=""+(nmonth+1)+"/"+ndate+"/"+nyear+"";
  document.getElementById('clockbox').innerHTML=clocktext;
  }

function renderWeather(){
  GetClock();
  setInterval(GetClock,1000);

  getCity();
  function getCity() {
    var city = document.querySelector("#citysearch").value;
    console.log(city);
    return city;
  }

  //my APIKey from my openweather account
  var APIKey = "9ba884c10ca90d0ca1f8f0ec657c12b7"
  var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + getCity() + "&appid=" + APIKey;
  var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + getCity() + "&appid=" + APIKey;

  //generic openweather API call looks like this:
  //api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

  //1dayforecast
  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
      url: queryURL1,
      method: "GET"
    })
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {
      // Log the queryURL
      console.log("current weather: " + queryURL1);
      // Log the resulting object
      console.log(response);
      // Convert the temp K to fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;
      // add temp content to html
      $(".tempF").text("Temperature (F) " + tempF.toFixed(2));
      // Transfer content to HTML
      $(".city").html("<h1>" + response.name + " Weather Details</h1>");
      $(".tempF").text("Temperature: " + tempF.toFixed(2) + " °F");
      $(".humidity").text("Humidity: " + response.main.humidity + "%");
      $(".wind").text("Wind Speed: " + (response.wind.speed*2.236936).toFixed(1) + " MPH"); //converts m/sec to mph
      //getting lat and long for UV
      var lon = response.coord.lon;
      var lat = response.coord.lat;
      var queryURL3 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
      $.ajax({
        url: queryURL3,
        method: "GET"
      })
      .then(function(response){
          console.log("here is the UV object " + queryURL3)
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
      document.querySelector(".citybox").innerHTML = response.name;
      document.querySelector("#bigcity").innerHTML = response.name + " ";
      
      newHistory();

      function newHistory() {
        $("#searchicon").click(function(){
          console.log("clicker")
          var newBtn = document.createElement("BUTTON")
          newBtn.setAttribute('class', 'citybox');
          newBtn.innerHTML = response.name;
          var cityList = document.getElementById("citylist");
          cityList.appendChild(newBtn);
        })
      }

      //from here, start putting each city search into local storage
      //use a for loop to plug them into #last1, #last2, etc.
      //have the #last1, #last2 retrieve cities from local storage with a delay of 1
      //lastly, make each old city clickable
  });

  //5 DAY FORECAST
  // Here we run our AJAX call to the OpenWeatherMap API
  //for these, each response.list item goes +3 hours, hence 5, 13, 21, 29, 37
  $.ajax({
    url: queryURL2,
    method: "GET"
  })
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {
    // Log the queryURL
    console.log("forecast weather: " + queryURL2);
    // Log the resulting object
    console.log(response);
    //pull temp & convert from K to F
    function pullTemp(listIndex) {
      tempF = (response.list[listIndex].main.temp - 273.15) *1.80 + 32;
      return tempF
    }
    //format date into mm/dd/yy. substr is (start, length)
    //values for listIndex are given by when we run PullDate at the "add forecast date to html" sectoin
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
    // add forecast date to html
    for(i = 0; i < 5; i++) {
      var dateid = "#fc-dt" + (i + 1);
      $(dateid).text(pullDate(5+8*i));
    }
    //add forecast temps to html. 
    // `pullTemp(5+8*i)` gets temps for all next 5 days. remember, response.list[] begins at [5]
    // `"#fc-temp" + (i + 1)` runs through all 5 HTML temp divs
    //toFixed(2) trims it to 2 decimal places
    for(i = 0; i < 5; i++) {
      var dateid = "#fc-temp" + (i + 1);
      $(dateid).text("Temp: " + pullTemp(5+8*i).toFixed(2) + " °F");
    } 
    //add forecast humidity to html
    //`"#fc-humid" + (i + 1)` runs through all 5 HTML humidity divs
    for(i = 0; i < 5; i++) {
      var dateid = "#fc-humid" + (i + 1);
      $(dateid).text("Humidity: " + response.list[5+8*i].main.humidity + "%");
    }
  });
}


// use this for weather icon images
// var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");