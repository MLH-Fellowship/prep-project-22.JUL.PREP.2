import React from "react";
import { PATHS, Route } from "../Components/route.js";

import Home from "./home";
import Trip from "./trip";

function ScreenRoutes() {
  return (
    <>
      <Route path={PATHS.HOME} component={<Home />} />
      <Route path={PATHS.TRIP} component={<Trip />} />
    </>
  );
}

export default ScreenRoutes;
