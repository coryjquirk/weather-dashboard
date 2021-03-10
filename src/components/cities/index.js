import React from "react";
import {Grid, Row, Col} from "react-bootstrap"
import "./style.css";
import $ from "jquery";
import renderWeather from "./script.js"


export default function Cities() {
  function setCity(event) {
    var city = "Bergen";
    console.log("city is" + document.getElementById("citysearch".value));
    return city;
  }
  var cityID;
  function firstButton() {
    var APIKey = "9ba884c10ca90d0ca1f8f0ec657c12b7";
    var queryURL1 =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      setCity() +
      "&appid=" +
      APIKey;
    $.ajax({
      url: queryURL1,
      method: "GET",
    }).then(function (response) {
      lastCity();
      function lastCity() {
        var i = localStorage.length;
        $(document).on("click", "#searchicon", function () {
          i++;
        });

        localStorage.setItem("lastcity" + [i], response.name);
      }
      var a = $("<button>");
      a.addClass("city");
      a.attr("id", "cityBtn");
      a.attr("name", response.name);
      a.attr("data-name", response.name);
      a.text(response.name);
      $("#history").append(a);
      return cityID;
    });
    console.log(localStorage);
  }
  firstButton();
  //renders buttons for city history
  function renderButtons() {
    $("#history").empty();
    for (var i = 0; i < localStorage.length; i++) {
      var a = $("<button>");
      a.addClass("city");
      a.attr("data-name", localStorage.getItem("lastcity"+[i]));
      a.text(localStorage.getItem("lastcity"+[i]));
      $("#history").append(a);
    }
  }
  renderButtons();
  //renders weather for clicked city

  return (
    <div id="citycolumn">
      <h2>City search:</h2>
      <form>
      <input placeholder="search city"/>
      <button
        id="searchicon"
        //let's do clicks with react not jquery. mmkay
        onSubmit={setCity}
        className="glyphicon glyphicon-search btn btn-light save10"
        type="submit"
      >SRCH
      </button>
      </form>
      <br />
      <br />
      <div id="history"></div>
    </div>
  );
}