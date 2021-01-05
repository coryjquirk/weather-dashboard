import React from 'react';
import './style.css';

export default function Fiveday(){
    return(
    <div class="col" id="fiveday">
            <h1>5-Day Forecast:</h1>
            <div class="row">
                <div class="forecastCard">
                    <h3 id="fc-dt1"></h3>
                    <text id="smallIcon1"></text>
                    <p id="fc-temp1">Temp: </p>
                    <p id="fc-humid1">Humidity: </p>
                </div>
                <div class="forecastCard">
                    <h3 id="fc-dt2"></h3>
                    <text id="smallIcon2"></text>
                    <p id="fc-temp2">Temp: </p>
                    <p id="fc-humid2">Humidity: </p>
                </div>
                <div class="forecastCard">
                    <h3 id="fc-dt3"></h3>
                    <text id="smallIcon3"></text>
                    <p id="fc-temp3">Temp: </p>
                    <p id="fc-humid3">Humidity: </p>
                </div>
                <div class="forecastCard">
                    <h3 id="fc-dt4"></h3>
                    <text id="smallIcon4"></text>
                    <p id="fc-temp4">Temp: </p>
                    <p id="fc-humid4">Humidity: </p>
                </div>
                <div class="forecastCard">
                    <h3 id="fc-dt5"></h3>
                    <text id="smallIcon5"></text>
                    <p id="fc-temp5">Temp: </p>
                    <p id="fc-humid5">Humidity: </p>
                </div>
            </div>
          </div>
)}