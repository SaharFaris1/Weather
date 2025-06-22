import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
  }>;
}

const WeatherPage = () => {
  const [lat, setLat] = useState<string>('');
  const [lon, setLon] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const fetchWeather = async () => {
    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);

    if (isNaN(latNum) || isNaN(lonNum)) {
      Swal.fire('Error', 'Please enter valid coordinates', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      

      const res = await axios.get('https://weatherapp-6wx0.onrender.com/api/weather',    {
        params: { lat: latNum, lon: lonNum },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setWeatherData(res.data);
    } catch (err: any) {
      console.error(err);
      const message = err.response?.data?.error || 'Failed to fetch weather data';
      Swal.fire('Error', message, 'error');
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-8 p-8 m-8">
      <h1 className="text-2xl font-bold">🌤️ Get Weather</h1>

      <input
        type="text"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        placeholder="Latitude"
        className="p-2 border rounded"
      />

      <input
        type="text"
        value={lon}
        onChange={(e) => setLon(e.target.value)}
        placeholder="Longitude"
        className="p-2 border rounded"
      />

      <button
        onClick={fetchWeather}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
      >
        Get Weather
      </button>

      {weatherData && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold">📍 {weatherData.name}</h2>
          <p>🌡️ Temperature: {weatherData.main.temp}°C</p>
          <p>☁️ Conditions: {weatherData.weather[0]?.description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;