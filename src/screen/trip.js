import React from "react";
import { Fab } from "../Components/common/Fab";

const navigateToHome = () => (window.location.href = "/");

export function Trip() {
  React.useEffect(() => {
    document.title = "Plan a trip";
  }, []);

  

  return (
    <>
      <Fab onClick={navigateToHome} icon="thermostat">
        Weather
      </Fab>
    </>
  );
}

export default Trip;
