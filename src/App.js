import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./logo.png";
import Box from "./Components/Box";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [generic, setGeneric] = useState("app");
  const [city, setCity] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((position) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${process.env.REACT_APP_APIKEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          setIsLoaded(true);
          setCity(`${result.name}, ${result.sys.country}`);
          setResults(results);
        })
        .catch((err) => {
          setIsLoaded(false);
          setError(err);
        });
    });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div className={[generic]}>
        <main>
          <div className="header">
            <img className="logo" src={logo} alt="MLH Prep Logo"></img>
            <h1>Weather App</h1>
          </div>
          <div>
            <h2>Enter a city below 👇</h2>
            <input
              type="text"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
            <div className="Results">
              {!isLoaded && <h2>Loading...</h2>}
              {console.log(results)}
              {isLoaded && results && (
                <>
                  <h3>{results.weather[0].main}</h3>
                  <p>Feels like {results.main.feels_like}°C</p>
                  <i>
                    <p>
                      {results.name}, {results.sys.country}
                    </p>
                  </i>
                </>
              )}
            </div>
          </div>
          <p className="required-things-heading">Things you should carry 🎒</p>
          {isLoaded && results && <Box weather={results.weather[0].main} />}
          <p className="required-things-heading">Things you should carry 🎒</p>
          {isLoaded && results && <Box weather={results.weather[0].main} />}
        </main>
      </div>
    );
  }
}

export default App;
