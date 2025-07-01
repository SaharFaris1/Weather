import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  weather: Array<{
    description: string;
  }>;
  dt: number; 
}

const WeatherPage = () => {
  const [lat, setLat] = useState<string>('');
  const [lon, setLon] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchWeather = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire('Error', 'You must be logged in to check the weather.', 'error');
      window.location.href = '/signin';
      return;
    }

    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);

    if (isNaN(latNum) || isNaN(lonNum)) {
      Swal.fire('Error', 'Please enter valid coordinates', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.get<WeatherData>('https://weather-api-zk64.onrender.com/weather', {
        params: { lat: latNum, lon: lonNum },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWeatherData(res.data);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      const message = err.response?.data?.error || 'Failed to fetch weather data';
      Swal.fire('Error', message, 'error');
    }
  };

  return (
    <div className="flex flex-col gap-8 p-8 m-8">
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
        disabled={isLoading}
        className={`bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors ${
          isLoading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Loading...' : 'Get Weather'}
      </button>

   
      {isLoading && <p className="text-center text-blue-500">Fetching weather...</p>}


      {weatherData && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-2">📍 Location: {weatherData.name}</h2>
          
      
          <p>🌡️ Temperature: {(weatherData.main.temp - 273.15).toFixed(1)}°C</p>
          <p>❄️ Feels Like: {(weatherData.main.feels_like - 273.15).toFixed(1)}°C</p>
          <p>💧 Humidity: {weatherData.main.humidity}%</p>
          <p>🌬️ Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>☁️ Cloud Coverage: {weatherData.clouds.all}%</p>
          <p>🧭 Wind Direction: {weatherData.wind.deg}°</p>
          <p>🔽 Pressure: {weatherData.main.pressure} hPa</p>
          <p>📅 Time: {new Date(weatherData.dt * 1000).toLocaleTimeString()}</p>
          <p>🌤️ Conditions: {weatherData.weather[0]?.description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;