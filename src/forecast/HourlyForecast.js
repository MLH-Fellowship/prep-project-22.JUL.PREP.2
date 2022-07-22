import React, { useEffect, useState } from 'react';
import "./HourlyForecast.css";

// function HourlyForecast({forecast}) {

//     useEffect(() => {
//        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric" + "&appid=" + process.env.REACT_APP_APIKEY)
//       .then(res => res.json())
//       .then((result) => {
//         if(result.cod !== '200'){
//           setIsLoaded(true)
//         }
//         else{
//         let hourlyForecast = []
//         result.list.forEach((fc) => {
//           hourlyForecast.push({
//             current_temp: fc.main.temp, 
//             condition: fc.weather[0].description, 
//             date: new Date(fc.dt * 1000),
//             feels_like: fc.main.feels_like,
//             temperature: {
//               minimum: fc.main.temp_min,
//               maximum: fc.main.temp_max, 
//             },
//             icon: fc.weather[0].icon,
//             windspeed: fc.wind.speed,
//             humidity: fc.main.humidity
//           })
//         }); 
//         setIsLoaded(true);
//         setError();
//         setResults(hourlyForecast)
//       } 
//     }, [city], []);

//     const weekdays = ["Sun", "Mon", "Tues", "Wed", "Thus", "Fri", "Sat"];
//     return (
//         <>
//         <div className='hourly-container'>
//             <div className='day'>{weekdays[forecast.date.getDay()]}</div>
//             <div className='hour'>{forecast.date.getHours()}:{forecast.date.getMinutes()}</div>
//             <img src={"http://openweathermap.org/img/wn/"+forecast.icon+"@2x.png"} alt="cloudy-icon"/>
//             <p>{Math.round(forecast.temperature.maximum)}&#8451;/{Math.round(forecast.temperature.minimum)}&#8451;</p>
//         </div>
//         </>
//     );
// })

// export default HourlyForecast;

const HourlyForecast = ({city}) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city +  "&units=metric" +  "&appid=" + process.env.REACT_APP_APIKEY) 
        .then((res) => res.json())
        .then((result) => {
            if(result.cod !== '200'){
                setIsLoaded(true)
            }
            else{
                let hourlyForecast = []
                result.list.forEach((fc) => {
                  hourlyForecast.push({
                    current_temp: fc.main.temp, 
                    condition: fc.weather[0].description, 
                    date: new Date(fc.dt * 1000),
                    feels_like: fc.main.feels_like,
                    temperature: {
                      minimum: fc.main.temp_min,
                      maximum: fc.main.temp_max, 
                    },
                    icon: fc.weather[0].icon,
                    windspeed: fc.wind.speed,
                    humidity: fc.main.humidity
                  }); 
                }); 
                
                setIsLoaded(true); 
                setError();
                setResults(result);
            }
        })
    }, [city], []);
    return(
        <>

        </>
    )
}

export default HourlyForecast; 