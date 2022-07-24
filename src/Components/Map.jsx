import { MapContainer, TileLayer } from "react-leaflet";
import DynamicMarker from "./DynamicMarker";

export default function Map({ coordinates, setCoordinates, city, setCity }) {
  return (
    <>
      <section className="leaflet-container">
        <MapContainer center={[coordinates.lat, coordinates.lng]} zoom={10}>
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
      </section>
    </>
  );
}
