import React, { useEffect } from 'react';
import "./HourlyForecast.css";

function HourlyForecast({forecast, unit}) {
    const weekdays = ["Sun", "Mon", "Tues", "Wed", "Thus", "Fri", "Sat"];
    return (
        <>
        <div className='hourly-container'>
            <div className='day'>{weekdays[forecast.date.getDay()]}</div>
            <div className='hour'>{forecast.date.getHours()}:{forecast.date.getMinutes()}</div>
            <img src={"http://openweathermap.org/img/wn/"+forecast.icon+"@2x.png"} alt="cloudy-icon"/>
            {unit 
            ? <p>{Math.round(forecast.temperature.maximum)}&#8451;/{Math.round(forecast.temperature.minimum)}&#8451;</p>
            : <p>{Math.round(forecast.temperature.maximum*1.8+32)}&#8457;/{Math.round(forecast.temperature.minimum*1.8+32)}&#8457;</p>
            }
        </div>
        </>
    )
}
export default HourlyForecast;