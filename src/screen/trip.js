import React from "react";
import { Fab } from "../Components/common/Fab";
import { PATHS, useRouter } from "../Components/route";

export function Trip() {
  const router = useRouter();
  const navigateToHome = () => router.push(PATHS.HOME);

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
