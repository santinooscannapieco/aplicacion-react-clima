import { useState } from "react";

export const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "YOUR_API_KEY";
  const difKelvin = 273.15; // Para pasar a grados Celsius restar este número

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `${urlBase}?q=${city}&appid=${API_KEY}&lang=es`
      );
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.error("Ha habido un error: ", error);
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSumbit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="container justify-content-center text-center flex">
      <h1 className="my-5">Aplicación de clima</h1>
      <form
        className="d-flex align-items-center justify-content-center gap-2"
        onSubmit={handleSumbit}
      >
        <input
          type="text"
          placeholder="Ingresa una ciudad"
          className="w-75 border border-1 rounded-1 p-1"
          value={city}
          onChange={handleCityChange}
        />
        <button type="submit" className="btn btn-primary flex-shrink-1">
          Buscar
        </button>
      </form>
      {weatherData && (
        <div>
          <h2 className="mt-5 mb-3">
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>
            La temperatura actual es:{" "}
            {Math.floor(weatherData.main.temp - difKelvin)}ºC
          </p>
          <p>
            La condición meteorológica actual:{" "}
            {weatherData.weather[0].description}
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
            className="w-25"
          />
        </div>
      )}
    </div>
  );
};
