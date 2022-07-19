import React from 'react';
import "./HourlyForecast.css";
import cloudy_icon from "../assets/cloudy.png";

function HourlyForecast({forecast}) {
    return (
        <>
        <div className='hourly-container'>
            <img src={cloudy_icon} alt="cloudy-icon"/>
            <p>{forecast.max}&#8451;/{forecast.min}&#8451;</p>
        </div>
        </>
    )
}

export default HourlyForecast;