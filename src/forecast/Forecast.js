import React, { useState } from "react";
import "./Forecast.css";
import HourlyForecast from "./HourlyForecast.js";
import humidity_logo from "../assets/humidity.png";
import windspeed_logo from "../assets/windspeed.png";

function Forecast({ hourlyForecast }) {
  const [isCelsius, setCelsius] = useState(true);

  let currentForecast = hourlyForecast[0];
  return (
    <>
      <div className="weather-container">
        <button className="temp-toggle" onClick={() => setCelsius(!isCelsius)}>
          {isCelsius ? <div>&#8457;</div> : <div>&#8451;</div>}
        </button>
        <div className="weather-card">
          <div className="weather-upperrow">
            <div className="weather-icon">
              <img
                src={
                  "http://openweathermap.org/img/wn/" +
                  currentForecast.icon +
                  "@2x.png"
                }
                alt="cloudy_img"
              />
            </div>
            {isCelsius ? (
              <p>{Math.round(currentForecast.current_temp)}&#8451;</p>
            ) : (
              <p>
                {Math.round(currentForecast.current_temp * 1.8 + 32)}&#8457;
              </p>
            )}
          </div>
          <div className="weather-lowerrow">
            <div id="humidity">
              <img src={humidity_logo} alt="humidity_icon" />
              <p>{currentForecast.humidity}%</p>
            </div>
            <div id="windspeed">
              <img src={windspeed_logo} alt="windspeed_icon" />
              <p>{currentForecast.windspeed}kmph</p>
            </div>
            <div id="real-feel">
              <p className="realfeel">R.F</p>
              {isCelsius ? (
                <p>{Math.round(currentForecast.feels_like)}&#8451;</p>
              ) : (
                <p>
                  {Math.round(currentForecast.feels_like * 1.8 + 32)}&#8457;
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="hourly-forecast-container">
          {hourlyForecast.map((el, index) => (
            <HourlyForecast key={index} forecast={el} unit={isCelsius} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Forecast;
