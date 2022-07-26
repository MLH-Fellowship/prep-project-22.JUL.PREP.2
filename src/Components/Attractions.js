import React, { useEffect } from "react";

const Attractions = (results) => {
	// console.log(results.results.city.name);
	const locationData = results.results;
	const city = locationData.city.name;
	const lng = locationData.city.coord.lon;
	const lat = locationData.city.coord.lat;
	
	useEffect(() => {
		fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=${lng}&lat=${lat}9&rate=2&format=json&limit=15&apikey=5ae2e3f221c38a28845f05b6c06a2c73eb6f2499d3b1881719d6dd39`)
			.then(res => res.json())
			.then(data => {
				const xid = data[0].xid;
				return fetch(`https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=5ae2e3f221c38a28845f05b6c06a2c73eb6f2499d3b1881719d6dd39`);
			})
			.then(res => res.json())
			.then(data => {
				console.log(data);
			})
	}, [city])
	return (
		<div>
			<h1>{city}</h1>
		</div>
	);
}

export default Attractions;