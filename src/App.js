import React, { useState, useEffect } from 'react';
import './App.css';
const API_KEY = process.env.REACT_APP_API_KEY;

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error('Failed to fetch weather data.');
        }

        const data = await response.json();

        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>WEATHER INFO</h1>
      {weatherData && (
        <div>
          
          <div id="div1">
            <h2 id="hh2">Current Weather</h2>
            <p>Location: {weatherData.name}</p>
            <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
            <p>Feels Like: {(weatherData.main.feels_like - 273.15).toFixed(2)}°C</p>
            <p>Description: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Sea Level: {weatherData.main.sea_level}</p>
            <p>Ground Level: {weatherData.main.grnd_level}</p>
            <p>Wind Speed: {weatherData.wind.speed}</p>
            <p>Wind Direction: {weatherData.wind.deg}°</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
