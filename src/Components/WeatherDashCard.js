import "./WeatherDashCard.css";
import React, { useState } from "react";


import SquareCard from "../UI/SquareCard";

function WeatherDashCard() {

  

  // const fetchRealWeather = function() {
  //         // set the Timelines GET endpoint as the target URL
  //         const getTimelineURL = "https://api.tomorrow.io/v4/timelines";

  //         // get your key from app.tomorrow.io/development/keys
  //         const apikey = "D5BmS2N4OFQPvOVcCjVEhkOd2O4uRTB8";

  //         // pick the location, as a latlong pair
  //         let location = [44.8125, 20.4612];

  //         // list the fields
  //         const fields = [
  //           "precipitationIntensity",
  //           "precipitationType",
  //           "windSpeed",
  //           "windGust",
  //           "windDirection",
  //           "temperature",
  //           "temperatureApparent",
  //           "cloudCover",
  //           "cloudBase",
  //           "cloudCeiling",
  //           "weatherCode",
  //         ];

  //         // choose the unit system, either metric or imperial
  //         const units = "metric";

  //         // set the timesteps, like "current", "1h" and "1d"
  //         const timesteps = ["current", "1h", "1d"];

  //         // configure the time frame up to 6 hours back and 15 days out
  //         const now = moment.utc();
  //         const startTime = moment.utc(now).add(0, "minutes").toISOString();
  //         const endTime = moment.utc(now).add(5, "days").toISOString();

  //         // specify the timezone, using standard IANA timezone format
  //         const timezone = "Europe/Belgrade";

  //         // request the timelines with all the query string parameters as options
  //         const getTimelineParameters =  queryString.stringify({
  //             apikey,
  //             location,
  //             fields,
  //             units,
  //             timesteps,
  //             startTime,
  //             endTime,
  //             timezone,
  //         }, {arrayFormat: "comma"});

  //         fetch(getTimelineURL + "?" + getTimelineParameters, {method: "GET"})
  //           .then((result) => result.json())
  //           .then((json) => console.log(json))
  //           .catch((error) => console.error("error: " + error));
  // }








  const [weatherFetched, setWeatherFetched] = useState(false);
  const [weatherData, setWeatherData] = useState({});

  const fetchWeather = async function () {
    const response = await fetch(
      "https://mocki.io/v1/cad7e2b6-1d3e-45ed-a160-d24a710b57f8"
    );
    const data = await response.json();
    setWeatherData({
      day: data.day,
      weather: data.weather,
      temperature: data.temperature,
    });
    setWeatherFetched(true);
  };

  return (
    <SquareCard>
      <h4>Weather</h4>
      {weatherFetched && (
        <React.Fragment>
          <h3>{` ${weatherData.day}`}</h3>
          <p>
            {`${weatherData.weather} - ${weatherData.temperature}`}
            <span>&#8451;</span>
          </p>
        </React.Fragment>
      )}
      {!weatherFetched && (
        <button className="weather-button" type="button" onClick={fetchWeather}>
          Fetch Weather
        </button>
      )}
    </SquareCard>
  );
}

export default WeatherDashCard;
