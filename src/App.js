import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import Forecast from "./forecast/Forecast.js";
import Search from "./Search";
import Box from "./Components/Box";
import logo from "./mlh-prep.png";
import Map from "./Components/Map";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City");
  const [coordinates, setCoordinates] = useState(null);
  const [results, setResults] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [generic, setGeneric] = useState("app");
  const [notfound, setFlag] = useState(false);

  // get geolocation of the user
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          // fetch city name based on coordinates
          fetch(
            `http://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${process.env.REACT_APP_APIKEY}`
          )
            .then((response) => response.json())
            .then((data) => {
              setCity(data[0].name);
            })
            .catch((error) => {
              console.error(
                `Couldn't fetch city based on user's location: ${error}`
              );
            });
        },
        (error) => {
          console.error(
            `Something went wrong while getting user's location: ${error}`
          );
        }
      );
    } else alert("Geolocation is not available");
  }, []);

  // fetch data when city changes
  useEffect(() => {
    // fetch weather based on the city
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=metric" +
        "&appid=" +
        process.env.REACT_APP_APIKEY
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result["cod"] !== "200") {
            setIsLoaded(false);
            if (result["cod"] == "404") {
              setIsLoaded(true);
              setFlag(true);
            }
          } else {
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
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error);
        }
      );

    // fetch coordinates based on the city
    const fetchCoordinates = async () => {
      try {
        if (city) {
          const response = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.REACT_APP_APIKEY}`
          );
          const data = await response.json();

          setCoordinates({ lat: data[0].lat, lng: data[0].lon });
        }
      } catch (error) {
        console.log("Something went wrong while fetching coordinates.");
        console.error(error);
      }
    };

    fetchCoordinates();
  }, [city]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div className={[generic]}>
        <main>
          <img className="logo" src={logo} alt="MLH Prep Logo"></img>
          <div>
            <h2>Enter a city below 👇</h2>

            <Search setCity={setCity} />

            <section className="forecast-map-section">
              {/* Forecast */}
              {isLoaded && forecast && (
                <>
                  <Forecast hourlyForecast={forecast} />
                </>
              )}

              {/* Map */}
              {coordinates && (
                <Map
                  coordinates={coordinates}
                  setCoordinates={setCoordinates}
                  city={city}
                  setCity={setCity}
                />
              )}
            </section>
          </div>

          {/* Things you should carry */}
          <p className="required-things-heading">Things you should carry 🎒</p>
          {isLoaded && results && (
            <Box weather={results.list[0].weather[0].main} />
          )}
        </main>
      </div>
    );
  }
}

export default App;
