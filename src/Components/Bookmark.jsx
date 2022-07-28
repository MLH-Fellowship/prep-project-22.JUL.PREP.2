import React from "react";
import "../assets/css/Bookmark.css";


function DailyForecast({days, forecast}) {
  return (
      <>
      <div className='daily-container'>
          <div className='day'>{days[forecast.date.getDay()]}</div>
          <img src={"http://openweathermap.org/img/wn/"+forecast.icon+"@2x.png"} alt="cloudy-icon"/>
				<p>{Math.round(forecast.temperature.maximum)}&#8451;</p>
				<p>{Math.round(forecast.temperature.minimum)}&#8451;</p>
      </div>
      </>
  )
}

function Bookmark({x, days, weather, dailyforecast}) {
	return (
		<>
		<div className="bookmark">
			<div className="bookmark-country-name">
				<h1>Moscow</h1>
			</div>
			<div className="bookmark-cloud-type">
				<p>Cloudy</p>
			</div>
			<div className="bookmark-wind-humidity">
				<ul>
					<li> Wind 0.00 m/s </li>
					<li> Humidity 92% </li>
				</ul>
			</div>
			<div className="bookmark-temp">
				<h1>20 &#8451;</h1>
			</div>
			<div className="bookmark-weathericon">
				<img alt="" src=""></img>
			</div>
			<div className="flex bookmark-daily-forecast">
		    {dailyforecast.map((el, index) => (
				  <DailyForecast key={index} days={days} forecast={el} />
        ))}
			</div>
		</div>
		</>
	)
}


function BookmarksBox({weather}) {
	const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	let daily_forecast = []

	// Populate the first data for each day
	weather.map((data, key) => {
		if (key === 0) {
			daily_forecast.push(data);
		}
		const last = daily_forecast.length - 1;

		if (!(data.date.getDay() == daily_forecast[last].date.getDay())) {
			daily_forecast.push(data);
		}
	});

	console.log(daily_forecast);

	let arr = [1, 2, 3, 4, 5];
	return (
		<div className="flex bookmark-box">
			{
				arr.map((number, key) => (
					<Bookmark
						x={key}
						days={weekdays}
					  weather={number}
						dailyforecast={daily_forecast.slice(0, 5)}
					/>
				))
			}
		</div>
	);
}

export default BookmarksBox;

