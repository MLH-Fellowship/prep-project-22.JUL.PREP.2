import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
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
            if (result["cod"] === 404) {
              setIsLoaded(true);
              setFlag(true);
            }
          } else {
            setIsLoaded(true);
            setResults(result);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );

    // fetch coordinates based on the city
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.REACT_APP_APIKEY}`
        );
        const data = await response.json();
        console.log(data);
        setCoordinates({ lat: data[0].lat, lng: data[0].lon });
      } catch (error) {
        console.error(error);
        alert("Something went wrong while fetching coordinates. ");
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

            <section className="results-map-container">
              <div className="Results">
                {!isLoaded && <h2>Loading...</h2>}
                {isLoaded && notfound && <h2>Data not available. </h2>}
                {isLoaded && results && !notfound && (
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
              </div>{" "}
              <div className="map">
                {coordinates && (
                  <Map
                    coordinates={coordinates}
                    setCoordinates={setCoordinates}
                    city={city}
                    setCity={setCity}
                  />
                )}
              </div>
            </section>
          </div>
          <p className="required-things-heading">Things you should carry 🎒</p>
          {isLoaded && results && <Box weather={results.weather[0].main} />}
        </main>
      </div>
    );
  }
}

export default App;
