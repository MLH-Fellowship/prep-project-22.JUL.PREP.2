import React, {useState} from "react";
import { Fab } from "../Components/common/Fab";
import TextField  from "@mui/material/TextField";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PlaceIcon from '@mui/icons-material/Place';
import './trip.css';


const navigateToHome = () => (window.location.href = "/");

export function Trip() {
  const [currentCity, setCurrentCity] = useState([]);
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
        setCurrentCity(currentCoords);
      })
    })
  }, []);
  console.log(currentCity)
  return ( 
    <>
    <div className="search-bar">
      <div className="search">
      <div className="current">
      <MyLocationIcon className="icon"/>
      <TextField 
        className="current-location"
        id="outlined-basic"
        variant="outlined"
        label="Current-location"
        size="Normal"
      />
      </div>
      <div className="destination">
      <PlaceIcon className="icon"/>
      <TextField
        className="destination-location" 
        id="outlined-basic"
        variant="outlined"
        label="Destination-location" 
        size="Normal"
      />
      </div>
      </div>
    </div>
      <Fab onClick={navigateToHome} icon="thermostat">
        Weather
      </Fab>
    </>
  );
}

export default Trip;
