import { useEffect, useState } from "react";
import './App.css';
import Forecast from "./forecast/Forecast.js";
import logo from './mlh-prep.png'

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City")
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric" + "&appid=" + process.env.REACT_APP_APIKEY)
      .then(res => res.json())
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
          })
        })
        setIsLoaded(true);
        setError();
        setResults(hourlyForecast)
        }
      }, 
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [city], [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return <>
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
      <div>
        <h2>Enter a city below 👇</h2>
        <input
          type="text"
          value={city}
          onChange={event => setCity(event.target.value)} />
          <div className="Results">
            {isLoaded && results && <>
              <Forecast hourlyForecast={results}/>
            </>}
          </div>
      </div>
    </>
  }
}

export default App;
