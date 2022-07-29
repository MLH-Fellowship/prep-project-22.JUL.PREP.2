import React, {useEffect, useState} from "react";
import { Fab } from "../Components/common/Fab";
import './trip.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Search from "../Search";
import RoutingMachine from "./routing";

const navigateToHome = () => (window.location.href = "/");

export function Trip() {
  const [currentCity, setCurrentCity] = useState(null);
  const [fromCity, setFromCity] = useState(null);
  const [toCity, setToCity] = useState(null);
  const [cityList, setCityList] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  function setRoute() {
    if(fromCity==null || toCity==null) {
      alert("Something went wrong, try again!");
      return;
    }
    fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${fromCity}&apiKey=${process.env.REACT_APP_HEREAPI}`)
    .then((res) => res.json())
      .then((result) => {
        console.log(result);
        let list = [...cityList];
        list.push({
          lat: result.items[0].position.lat,
          lon: result.items[0].position.lng,
        });
        setCityList(list);
      });
    fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${toCity}&apiKey=${process.env.REACT_APP_HEREAPI}`)
      .then((res) => res.json())
        .then((result) => {
          console.log(result);
          let list = [...cityList];
          list.push({
            lat: result.items[0].position.lat,
            lon: result.items[0].position.lng,
          });
          setCityList(list);
          setLoaded(true);
        });
      
  }


  React.useEffect(() => {
    document.title = "Plan a trip";

    window.navigator.geolocation.getCurrentPosition((position) => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${process.env.REACT_APP_APIKEY}`)
      .then(res => res.json())
      .then(result => {
        console.log(result)
        setCurrentCity({
          lat: result.coord.lat, 
          lon: result.coord.lon, 
          name: result.name 
        });
      })
    })

  }, []);
  console.log(currentCity)
  return ( 
    <>
    <div className="search-bar">
      <Search setCity={setFromCity} />
      <Search setCity={setToCity} />
    </div>
    <button onClick={setRoute} className="route_button">Find Route</button>
      {currentCity==null? <div>Loading...</div> :
        <MapContainer center={[currentCity.lat,currentCity.lon]} zoom={13} scrollWheelZoom={false}>
           <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {cityList.length === 2 && <RoutingMachine geocodes={cityList} />}
            <Marker position={[currentCity.lat,currentCity.lon]}>
            <Popup>You are here!</Popup>
          </Marker>
        </MapContainer>
          }
      <Fab onClick={navigateToHome} icon="thermostat">
        Weather
      </Fab>
    </>
  );
}

export default Trip;
