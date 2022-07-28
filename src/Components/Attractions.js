import React, { useState, useEffect, useMemo } from "react";

const Attractions = (results) => {
  // console.log(results.results.city.name);
  const locationData = results.results;
  const city = locationData.city.name;
  const lng = locationData.city.coord.lon;
  const lat = locationData.city.coord.lat;

  console.log(city);
  console.log(lng);
  console.log(lat);

  const [attractionsData, setAttractionsData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const AttractionsApiUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=${lng}&lat=${lat}9&rate=2&format=json&limit=15&apikey=${process.env.REACT_APP_PLACESKEY}`;
  useEffect(() => {
    (async () => {
      try {
        console.log("city ", city);
        setIsLoading(true);
        const res = await fetch(AttractionsApiUrl);

        const attractions = await res.json();

        //console.log(attractions);
        // const xid = attractions[0].xid;

        let xids = [];
        for (let i = 0; i < Math.min(attractions.length, 7); i++) {
          //console.log(attractions[i].xid);
          xids.push(attractions[i].xid);
        }

        // console.log(xids);
        if (xids.length === 0) {
          console.log("Sorry nothing found");
        }

        const dataArray = [];
        xids.forEach(async (xid) => {
          if (xid) {
            const AttractionsDataApiUrl = `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${process.env.REACT_APP_PLACESKEY}`;
            const res = await fetch(AttractionsDataApiUrl);
            console.log("ran");
            const data = await res.json();
            // console.log(data);
            if (data.name) {
              const {
                name,
                preview: { source } = {},
                wikipedia_extracts: { text } = {},
              } = data;
              //console.log(name, source, text);
              dataArray.push({ name, source, text });
            }
          }
        });

        setAttractionsData(dataArray);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    })();
  }, [city]);

  useEffect(() => {
    console.log("ATTRACTION DATA", attractionsData);
  }, [attractionsData]);

  const attractionsDataComponent = useMemo(
    () =>
      attractionsData.map((attraction) => {
        // console.log("HERE");
        console.log(attraction.name, attraction.name !== "");
        return <p key={attraction.name}>{attraction.name}</p>;
      }),
    [attractionsData]
  );

  console.log(
    "attractionsDataComponent.length",
    attractionsDataComponent.length
  );

  //console.log("LMAO WORKING",attractionsData);
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>{city}</h1>
          <p>HEREEE</p>

          {attractionsDataComponent.length === 0
            ? "No results"
            : attractionsDataComponent}
        </div>
      )}
    </>
  );
};

export default Attractions;
