import React from "react";

import Home from "./screen/home";
import Trip from "./screen/trip";

function Pages() {
  return (
    <>
      <Route path={"/"} component={Home} />
      <Route path={"/trip"} component={Trip} />
    </>
  );
}

export default Pages;

export function Route({ path, component }) {
  if (path === window.location.pathname) return React.createElement(component);
  return null;
}
