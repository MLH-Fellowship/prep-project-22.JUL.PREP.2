import React from "react";
import { Fab } from "../Components/common/Fab";
import { Food } from "../Components/Food";

const navigateToHome = () => (window.location.href = "/");

export function Trip() {
  React.useEffect(() => {
    document.title = "Plan a trip";
  }, []);

  

  return (
    <>
      <Food country="PK" />
      <Fab onClick={navigateToHome} icon="thermostat">
        Weather
      </Fab>
    </>
  );
}

export default Trip;
