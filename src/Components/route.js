import React from "react";

export const useRouter = () => {
  return {
    push(path) {
      window.location.href = path;
    },
  };
};

export const PATHS = {
  HOME: "/",
  TRIP: "/trip",
};

export function Route({ path, component }) {
  if (path === window.location.pathname) return <>{component}</>;
  return null;
}
