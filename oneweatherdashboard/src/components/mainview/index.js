import React from 'react';
import './style.css';
import Cities from '../cities';
import Fiveday from '../fiveday';

export default function Mainview(){
    return(
    <div>
        <Cities/>
        <div id="rightside">
          <div id="mainblock">
            <div class="col">
                <h2><text id="bigcity"></text><text id="clockbox"></text><text id="mainIcon"></text></h2>
                <br/>
                <p class="tempF">Temperature: </p>
                <br/>
                <p class="humidity">Humidity: </p>
                <br/>
                <p class="wind">Wind Speed: </p>
                <br/>
                <div id="UVline">
                    <p>UV Index: <text id="UV"></text></p>
                </div>
            </div>    
        </div>
        <Fiveday/>
        </div>
    </div>
)}