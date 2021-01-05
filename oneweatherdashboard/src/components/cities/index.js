import React from 'react';
import './style.css';

export default function Cities(){
    return(

    <div class="col-md-2" id="citycolumn">
          <h2>
              City search: 
          </h2>
          <input id="citysearch"/><button id="searchicon" onclick="firstButton(); renderWeather(); document.getElementById('citysearch').value = ''" class="glyphicon glyphicon-search btn btn-light save10"> </button>

          <br/>
          <br/>
          <div id="history"></div>
    </div>
    )}
