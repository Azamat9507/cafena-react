import { Box, Stack, Button, Container } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

interface WeatherData {
  name: string;
  weather: { icon: string; description: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
}

const WeatherApp: React.FC = () => {
  const apiKey = "eb7a931bf85df346c6f81c1699322f60";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [backgroundImage, setBackgroundImage] = useState("");

  const fetchWeather = useCallback((city: string) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      )
      .then((response) => {
        const data: WeatherData = response.data;
        setWeatherData(data);
        displayWeather(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [apiKey]);

  const displayWeather = (data: WeatherData) => {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    // Update the JSX elements to display weather data
    const cityElement = document.querySelector<HTMLHeadingElement>(".city");
    if (cityElement) {
      cityElement.innerText = "Weather in " + name;
    }
    const iconElement = document.querySelector<HTMLImageElement>(".icon");
    if (iconElement) {
      iconElement.src = `https://openweathermap.org/img/wn/${icon}.png`;
    }
    const descriptionElement = document.querySelector<HTMLDivElement>(
      ".description"
    );
    if (descriptionElement) {
      descriptionElement.innerText = description;
    }
    const temperatureElement = document.querySelector<HTMLHeadingElement>(
      ".temperature"
    );
    if (temperatureElement) {
      temperatureElement.innerText = temp + "°C";
    }
    const humidityElement = document.querySelector<HTMLDivElement>(".humidity");
    if (humidityElement) {
      humidityElement.innerText = "Humidity: " + humidity + "%";
    }
    const windElement = document.querySelector<HTMLDivElement>(".wind");
    if (windElement) {
      windElement.innerText = "Wind speed: " + speed + " km/h";
    }
    const weatherElement = document.querySelector<HTMLDivElement>(".weather");
    if (weatherElement) {
      weatherElement.classList.remove("loading");
    }
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
    setBackgroundImage(`https://source.unsplash.com/1600x900/?${name}`);
  };

  const search = () => {
    const searchBar = document.querySelector<HTMLInputElement>(".search-bar");
    if (searchBar) {
      fetchWeather(searchBar.value);
    }
  };

  useEffect(() => {
    fetchWeather("Seoul");
  }, [fetchWeather]);

  return (
    
    <div className="top_coffeeshop">
    <div className="category_title_shop">Real-time Weather Updates</div>
    <div
      className="custom-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    > 
      <Box sx={{ ml: "69%" }} className="card-weather">
        <Stack sx={{ textAlign: "center", marginTop: "20px" }} spacing={2}>
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                search();
              }
            }}
          />
          <div 
            style={{backgroundColor: "#7c7c7c2b;"}} className="button" onClick={search}>
            <svg
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              height="1.5em"
              width="1.5em"
            >
              <path
                d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"
              ></path>
            </svg>
          </div>
          <Box className="weather loading">
            <h2 className="city">City</h2>
            <h3 className="temperature">Temperature</h3>
            <Box>
              <img
                src="https://openweathermap.org/img/wn/03n.png"
                alt=""
                className="icon"
              />
              <div className="description"></div>
            </Box>
            <div className="humidity"></div>
            <div className="wind"></div>
          </Box>
        </Stack>
      </Box>
    </div>
  </div>
  );
};

export default WeatherApp;
