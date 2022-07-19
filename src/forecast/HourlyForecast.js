import React from 'react';
import "./HourlyForecast.css";
import cloudy_icon from "../assets/cloudy.png";

function HourlyForecast({forecast}) {
    return (
        <>
        <div className='hourly-container'>
            <img src={cloudy_icon} alt="cloudy-icon"/>
            <p>{forecast.temperature.maximum}&#8451;/{forecast.temperature.minimum}&#8451;</p>
        </div>
        </>
    )
}

export default HourlyForecast;