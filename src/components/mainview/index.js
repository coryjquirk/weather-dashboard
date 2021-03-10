import React from "react";
import {Grid, Row, Col} from "react-bootstrap"
import "./style.css";
import Cities from "../cities";
import Fiveday from "../fiveday";

export default function Mainview() {
  setInterval(GetClock, 1000);
  GetClock();
  const clocktext = GetClock();
  function GetClock() {
    var d = new Date();
    var nmonth = d.getMonth(),
      ndate = d.getDate(),
      nyear = d.getFullYear();
    var clocktext = "" + (nmonth + 1) + "/" + ndate + "/" + nyear + "";
    return clocktext;
  }
  return (
    <Row>
      <Col md={4}>
        <Cities />
      </Col>
      <Col md={8} id="rightside">
        <div id="mainblock">
          <div>
            <h2>
              <span id="bigcity"></span>
              <span id="clockbox">{clocktext}</span>
              <span id="mainIcon"></span>
            </h2>
            <br />
            <p className="tempF">Temperature: </p>
            <br />
            <p className="humidity">Humidity: </p>
            <br />
            <p className="wind">Wind Speed: </p>
            <br />
            <div id="UVline">
              <p>
                UV Index: <text id="UV"></text>
              </p>
            </div>
          </div>
        </div>
        <Fiveday />
      </Col>
    </Row>
  );
}
