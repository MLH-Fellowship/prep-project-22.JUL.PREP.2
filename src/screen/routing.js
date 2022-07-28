import leaflet from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

function createRoutineMachineLayer({geocodes}) {
    console.log(geocodes);
  const instance = leaflet.Routing.control({
    waypoints: [
      leaflet.latLng(geocodes[0].lat, geocodes[0].lon),
      leaflet.latLng(geocodes[1].lat, geocodes[1].lon)
    ],
    lineOptions: {
        styles: [{ color: "#6FA1EC", weight: 6 }]
      },
    show: false,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
