import React, { useState, useEffect } from "react";

const Attractions = (results) => {
  const locationData = results.results;
  const city = locationData.city.name;
  const lng = locationData.city.coord.lon;
  const lat = locationData.city.coord.lat;

  const [attractionsData, setAttractionsData] = useState([]);

  const AttractionsApiUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=${lng}&lat=${lat}9&rate=2&format=json&limit=15&apikey=5ae2e3f221c38a28845f05b6c06a2c73eb6f2499d3b1881719d6dd39`;

  useEffect(() => {
    (async () => {
      // Fetching all attractions
      const attractions = await fetch(AttractionsApiUrl).then((res) =>
        res.json()
      );

      const xids = attractions.map((attraction) => attraction.xid);
      if (xids.length === 0) {
        console.log("Sorry nothing found");
        return;
      }

      let dataArray = [];
      for (let index = 0; index < 5; index++) {
        const xid = xids[index];
        const AttractionsDataApiUrl = `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=5ae2e3f221c38a28845f05b6c06a2c73eb6f2499d3b1881719d6dd39`;

        // Fetching detailed info about each attraction
        const data = await fetch(AttractionsDataApiUrl).then((res) =>
          res.json()
        );
        dataArray.push(data);
      }
      setAttractionsData([...dataArray]);
    })();
  }, [city]);

  return (
    <div>
      <h1>{city}</h1>
      <div>
        {attractionsData.map((attractionData) => (
          <p key={attractionData.xid}>{attractionData.name}</p>
        ))}
      </div>
    </div>
  );
};

export default Attractions;
