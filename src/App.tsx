import { useEffect, useState, type ReactNode } from 'react';
import { Cloud } from 'lucide-react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { WeatherDisplay } from './components/WeatherDisplay';
import { getWeatherIcon } from './utils/weatherIcons';

import './App.css';

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: number;
  icon: ReactNode;
  forecast: ForecastDay[];
}

export interface ForecastDay {
  day: string;
  temp: number;
  condition: number;
  icon: ReactNode;
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData>(() => {
    const storedData = localStorage.getItem('weatherData');
    return storedData ? JSON.parse(storedData) : undefined;
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (city: string) => {
    searchCity(city);
  };

  async function searchCity(city: string) {
    try {
      setLoading(true);

      // 1 Find lat/lon by city
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );

      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError('City not found');
        return;
      }

      const { name, country, latitude, longitude } = geoData.results[0];

      // 2 Find weather

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&hourly=relativehumidity_2m,windspeed_10m&timezone=auto`
      );

      const weatherData = await weatherRes.json();

      const forecast = weatherData.daily.time
        .slice(0, 5)
        .map((date: string, index: number) => ({
          day: new Date(date).toLocaleDateString('en-US', {
            weekday: 'short',
          }),
          temp: Math.round(
            (weatherData.daily.temperature_2m_max[index] +
              weatherData.daily.temperature_2m_min[index]) /
              2
          ),
          condition: weatherData.daily.weathercode[index],
          icon: getWeatherIcon(weatherData.daily.weathercode[index]),
        }));

      setWeatherData({
        city: name,
        country,
        temperature: weatherData.current_weather.temperature,
        condition: weatherData.current_weather.weathercode,
        icon: getWeatherIcon(weatherData.current_weather.weathercode),
        forecast,
      });
    } catch (err) {
      setError('Error fetching weather');
    } finally {
      setLoading(false);
    }
  }

  // Local Storage

  useEffect(() => {
    if (weatherData) {
      localStorage.setItem('weatherData', JSON.stringify(weatherData));
    }
  }, [weatherData]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Header />

        <SearchBar onSearch={handleSearch} loading={loading} />
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Weather Display */}
        {weatherData && !loading && (
          <WeatherDisplay weatherData={weatherData} />
        )}

        {/* Loading State */}
        {loading && (
          <div className="mt-8 text-center">
            <div className="inline-block w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-purple-600">Fetching weather data...</p>
          </div>
        )}

        {/* Welcome State */}
        {!weatherData && !loading && !error && (
          <div className="mt-16 text-center">
            <Cloud className="w-24 h-24 mx-auto text-purple-300 mb-6" />
            <p className="text-purple-400 text-lg">
              Enter a city name to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
