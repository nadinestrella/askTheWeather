import { Cloud } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { WeatherDisplay } from '../components/WeatherDisplay';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: number;
  forecast: ForecastDay[];
}

export interface ForecastDay {
  day: string;
  temp: number;
  condition: number;
}

function HomePage() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(() => {
    const storedData = localStorage.getItem('weatherData');
    if (!storedData) return null;
    try {
      return JSON.parse(storedData) as WeatherData;
    } catch {
      localStorage.removeItem('weatherData');
      return null;
    }
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCitySearch = (city: string) => {
    if (!city.trim()) return;
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
        }));

      setWeatherData({
        city: name,
        country,
        temperature: weatherData.current_weather.temperature,
        condition: weatherData.current_weather.weathercode,
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
    <div>
      <Link
        to="/ia"
        className="inline-block mt-5 mb-4 px-4 py-2 bg-purple-500 text-white rounded-xl"
      >
        IA Page ✨
      </Link>
      <SearchBar
        onSearch={handleCitySearch}
        loading={loading}
        buttonText="Search Weather"
      />
      {error && <ErrorMessage error={error} />}

      {/* Weather Display */}
      {weatherData && !loading && <WeatherDisplay weatherData={weatherData} />}

      {/* Loading State */}
      {loading && <Loading />}

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
  );
}

export default HomePage;
