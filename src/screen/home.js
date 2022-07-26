import React, { useEffect, useState } from "react";
import "./home.css";
import { Fab } from "../Components/common/Fab";
import Box from "../Components/Box";
import logo from "../assets/logo.png";
import Forecast from "../forecast/Forecast.js";
import Search from "../Search";

const navigateToTrip = () => (window.location.href = "/trip");

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City");
  const [results, setResults] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [generic, setGeneric] = useState("app");
  const [notfound, setFlag] = useState(false);

  console.log(1, results);
  const fetchWeather = (url) => {
    return fetch(url)
      .then((res) => res.json())
      .then((result) => {
        if (result.cod !== "200") {
          setIsLoaded(false);
          console.log("hah");
          if (result["cod"] == "404") {
            setIsLoaded(true);
            setFlag(true);
          }
          return null;
        }
        console.log("yo");

        let hourlyForecast = [];
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
            humidity: fc.main.humidity,
          });
        });
        setForecast(hourlyForecast);
        setIsLoaded(true);
        setResults(result);
        document.body.classList = result.list[0].weather[0].main;
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  };

  useEffect(() => {
    document.body.classList.add("app");
    document.title = "Weather";
    window.navigator.geolocation.getCurrentPosition((position) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${process.env.REACT_APP_APIKEY}`
      ).then(res=> res.json())
      .then((result)=>{

        setIsLoaded(true);
        console.log("name",result.name);
        setCity(`${result.name}, ${result.sys.country}`);
        setResults(results);
      })
      .catch((err)=>{
        setIsLoaded(false);
        setError(err);
      });;
    });
  }, []);

  useEffect(() => {
    fetchWeather(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=metric" +
        "&appid=" +
        process.env.REACT_APP_APIKEY
    );
  }, [city]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <div className="header">
          <img className="logo" src={logo} alt="MLH Prep Logo"></img>
          <h1>Weather App</h1>
        </div>
        <main>
          <h2>Enter a city below 👇</h2>
          <Search setCity={setCity} />
          <div className="Results">
            {!isLoaded && <h2>Loading...</h2>}

            {/* {isLoaded && results && (
              <>
                <h3>{results.weather[0].main}</h3>
                <p>Feels like {results.main.feels_like}°C</p>
                <i>
                  <p>
                    {results.name}, {results.sys.country}
                  </p>
                </i>
              </>
            )} */}
            {isLoaded && forecast && (
              <>
                <Forecast hourlyForecast={forecast} />
              </>
            )}
          </div>
          <p className="required-things-heading">Things you should carry 🎒</p>
          {isLoaded && results && (
            <Box weather={results.list[0].weather[0].main} />
          )}
          <Fab icon={"airplane_ticket"} onClick={navigateToTrip}>
            Plan Trip
          </Fab>
        </main>
      </>
    );
  }
}

export default App;
