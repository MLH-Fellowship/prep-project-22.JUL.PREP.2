import React, { useEffect } from "react";

const Attractions = (results) => {
	// console.log(results.results.city.name);
	const locationData = results.results;
	const city = locationData.city.name;
	const lng = locationData.city.coord.lon;
	const lat = locationData.city.coord.lat;

	const AttractionsApiUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=${lng}&lat=${lat}9&rate=2&format=json&limit=15&apikey=5ae2e3f221c38a28845f05b6c06a2c73eb6f2499d3b1881719d6dd39`;
	useEffect(() => {
		(async () => {
			const attractions = await fetch(AttractionsApiUrl).then(res => res.json());
			// console.log(attractions);
			const xid = attractions[0].xid;

			const AttractionsDataApiUrl = `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=5ae2e3f221c38a28845f05b6c06a2c73eb6f2499d3b1881719d6dd39`;
			const attractionsData = await fetch(AttractionsDataApiUrl).then(res => res.json());
			// console.log(attractionsData);
		})();
	}, [city])

	return (
		<div>
			<h1>{city}</h1>
		</div>
	);
}

export default Attractions;