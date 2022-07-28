import React, {useState} from "react";
import { Fab } from "../Components/common/Fab";
import './trip.css';
import Search from "../Search";


const navigateToHome = () => (window.location.href = "/");

export function Trip() {
  const [currentCity, setCity] = useState("New York City");
  const [currentCityData, setCurrentCityData] = useState([])
  React.useEffect(() => {
    document.title = "Plan a trip";

    window.navigator.geolocation.getCurrentPosition((position) => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${process.env.REACT_APP_APIKEY}`)
      .then(res => res.json())
      .then(result => {
        console.log(result)
        let currentCoords = []; 
        currentCoords.push({
          lat: result.coord.lat, 
          lon: result.coord.lon, 
          name: result.name 
        })
        setCurrentCityData(currentCoords);
      })
    })
  }, []);
  console.log(currentCityData)
  return ( 
    <>
    <div className="search-bar">
      <Search setCity={setCity} />
      <Search setCity={setCity} />
    </div>
      <Fab onClick={navigateToHome} icon="thermostat">
        Weather
      </Fab>
    </>
  );
}

export default Trip;
