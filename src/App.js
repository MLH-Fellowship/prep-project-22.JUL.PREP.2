import { useEffect, useState } from "react";
import React from 'react'
import './App.css';
import Forecast from "./forecast/Forecast.js";
import Search from "./Search";
import Box from "./Components/Box";
import logo from './mlh-prep.png'

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City")
  const [results, setResults] = useState(null);
  const [generic, setGeneric]=useState("app");
  const [notfound,setFlag]=useState(false);
  useEffect(() => {

    // fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric" + "&appid=" + process.env.REACT_APP_APIKEY)
    //   .then(res => res.json())
    //   .then((result) => {
    //     if(result.cod !== '200'){
    //       setIsLoaded(true)
    //     }
    //     else{
    //     let hourlyForecast = []
    //     result.list.forEach((fc) => {
    //       hourlyForecast.push({
    //         current_temp: fc.main.temp, 
    //         condition: fc.weather[0].description, 
    //         date: new Date(fc.dt * 1000),
    //         feels_like: fc.main.feels_like,
    //         temperature: {
    //           minimum: fc.main.temp_min,
    //           maximum: fc.main.temp_max, 
    //         },
    //         icon: fc.weather[0].icon,
    //         windspeed: fc.wind.speed,
    //         humidity: fc.main.humidity
    //       })
    //     })
    //     setIsLoaded(true);
    //     setError();
    //     setResults(hourlyForecast)
    //   },
 
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric" +
        "&appid=" +
        process.env.REACT_APP_APIKEY
    )
      .then((res) => res.json())
      .then(
        (result) => {
            if (result["cod"] !== 200) {
            setIsLoaded(false);
            if(result["cod"]==404)
            {
              setIsLoaded(true);
              setFlag(true);

            }
          }
          else {
            setIsLoaded(true);
            setResults(result);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }

      )
       }, [city]) 

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return <div className={[generic]}>
      <main>
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

        <Search setCity={setCity} />


        <div className="Results">
          {!isLoaded && <h2>Loading...</h2>}
          {isLoaded && notfound && <h2>Data not available. </h2>}
          {console.log(results)}
          {isLoaded && results && !notfound &&<>
            <h3>{results.weather[0].main}</h3>
            <p>Feels like {results.main.feels_like}°C</p>
            <i><p>{results.name}, {results.sys.country}</p></i>
          </>}
        </div>
      </div>
      <p className="required-things-heading">Things you should carry 🎒</p>
      {isLoaded && results && <Box weather={results.weather[0].main}/>}
      </main>
      
    </div>
  }
}

export default App;