import React, { useEffect, useState } from "react";
import "./home.css";
import { Fab } from "../Components/common/Fab";
import Box from "../Components/Box";
import BookmarksContainer from "../Components/Bookmark";
import logo from "../assets/logo.png";
import Forecast from "../forecast/Forecast.js";
import Search from "../Search";
import Map from "../Components/Map";

const navigateToTrip = () => (window.location.href = "/trip");

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City");
  const [coordinates, setCoordinates] = useState(null);
  const [results, setResults] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [generic, setGeneric] = useState("app");
  const [notfound, setFlag] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

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
    } else {
      setCoordinates({
        lat: 40.7313432,
        lng: -74.2170748,
      });
      alert("Geolocation is not available");
    }
  }, []);

  const fetchWeather = (url) => {
    return fetch(url)
      .then((res) => res.json())
      .then((result) => {
        if (result.cod !== "200") {
          setIsLoaded(false);
          if (result.name !== null) {
            setIsLoaded(true);
            setCity(`${result.name}, ${result.sys.country}`);
            setResults(results);
          }
          if (result["cod"] == "404") {
            setIsLoaded(true);
            setFlag(true);
          }
          return null;
        }

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
      fetchWeather(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${process.env.REACT_APP_APIKEY}`
      );
    });
    if(localStorage.getItem('bookmarkedLocations')===null){
      localStorage.setItem('bookmarkedLocations',JSON.stringify([]));
      setBookmarks([]);
    }
    else{
      setBookmarks(JSON.parse(localStorage.getItem('bookmarkedLocations')));
    }
  }, []);

  useEffect(() => {
    fetchWeather(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=metric" +
        "&appid=" +
        process.env.REACT_APP_APIKEY
    );
    const bookmarkedLocations = JSON.parse(localStorage.getItem('bookmarkedLocations'));
    if(bookmarkedLocations.includes(city)) setBookmarked(true);
    else setBookmarked(false);
    fetchCoordinates();
  }, [city]);

  const bookmarkLocation = (location)=>{
     let bookmarkedLocations = JSON.parse(localStorage.getItem('bookmarkedLocations'));
     if(bookmarkedLocations.includes(location)){
        bookmarkedLocations = bookmarkedLocations.filter(boomark=>{
          return boomark!==location;
        });
        setBookmarked(false);
     }
     else{
       bookmarkedLocations.push(location);
       setBookmarked(true);
     }
     localStorage.setItem('bookmarkedLocations',JSON.stringify(bookmarkedLocations));
     setBookmarks(bookmarkedLocations);
  }


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
          <div className="flex search-container">
            <Search setCity={setCity} />
            {isLoaded && !notfound && !bookmarked?<div className="bookmark-button" onClick={()=>{
              bookmarkLocation(city);
            }}>Add Bookmark</div>:null}
          </div>
          <div className="Results">
            {!isLoaded && <h2>Loading...</h2>}
            {isLoaded && forecast && (
              <>
                <Forecast hourlyForecast={forecast} />
              </>
            )}
          </div>
          {/* Map */}
          {coordinates && (
            <Map
              coordinates={coordinates}
              setCoordinates={setCoordinates}
              city={city}
              setCity={setCity}
            />
          )}

          <p className="required-things-heading">Things you should carry 🎒</p>
          {isLoaded && results && (
            <Box weather={results.list[0].weather[0].main} />
          )}

          <h1>Bookmarked Locations 🔖</h1>
					<BookmarksContainer bookmarks={bookmarks} bookmarkLocation={bookmarkLocation}/>

          <Fab icon={"airplane_ticket"} onClick={navigateToTrip}>
            Plan Trip
          </Fab>
        </main>
      </>
    );
  }
}

export default App;
