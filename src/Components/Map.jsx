import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "../assets/css/Box.css";
import DynamicMarker from "./DynamicMarker";

export default function Map({ coordinates, setCoordinates, city, setCity }) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) {
      map.setView([coordinates.lat, coordinates.lng], 10, {
        duration: 3,
      });
    }
  }, [coordinates]);

  return (
    <>
      <div className="map-container">
        <MapContainer
          className="leaflet-container"
          center={[coordinates.lat, coordinates.lng]}
          zoom={10}
          ref={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DynamicMarker
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            city={city}
            setCity={setCity}
          />
        </MapContainer>
      </div>
    </>
  );
}
