import React from 'react'
import "./Forecast.css"
import HourlyForecast from "./HourlyForecast.js";
import humidity_logo from "../assets/humidity.png";
import precipitation_logo from "../assets/precipitation.png";
import windspeed_logo from "../assets/windspeed.png";
import cloudy_img from "../assets/cloudy.png";


function Forecast({hourlyForecast}) {
    return (
        <>
        <div className='weather-card'>
            <div className='weather-upperrow'>
                <div className='weather-icon'>
                    <img src={cloudy_img} alt='cloudy_img'/>
                </div>
                <p>29&#8451;</p>
            </div>
            <div className='weather-lowerrow'>
                <div id='humidity'>
                    <img src={humidity_logo} alt='humidity_icon'/>
                    <p>90%</p>
                </div>
                <div id='windspeed'>
                    <img src={windspeed_logo} alt='windspeed_icon'/>
                    <p>13kmph</p>
                </div>
                <div id='precipitation'>
                    <img src={precipitation_logo} alt='precipitation_icon'/>
                    <p>63%</p>
                </div>
            </div>
        </div>
        <div className='hourly-forecast-container'>
            {hourlyForecast.map(el => (
                <HourlyForecast forecast={el} />
            ))}
        </div>
        </>
    )
}

export default Forecast;