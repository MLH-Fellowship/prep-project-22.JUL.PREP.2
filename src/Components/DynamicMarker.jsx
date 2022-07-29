import { Marker, Popup, useMapEvent } from "react-leaflet";

export default function DynamicMarker({
  coordinates,
  setCoordinates,
  city,
  setCity,
}) {
  useMapEvent("click", (e) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${e.latlng.lat}&lon=${e.latlng.lng}&appid=6b8787a41729604bd297db92c4c210b8`
    )
      .then((res) => res.json())
      .then((res) => {
        const newGeoLoc = res.coord;
        setCity(res.name);
        setCoordinates({ lat: newGeoLoc.lat, lng: newGeoLoc.lon });
      });
  });

  return (
    <>
      <Marker position={[coordinates.lat, coordinates.lng]}>
        <Popup>You are in {city}!</Popup>
      </Marker>
    </>
  );
}
