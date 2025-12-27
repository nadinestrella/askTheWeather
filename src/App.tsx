import { useState } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { WeatherDisplay } from './components/WeatherDisplay';
import { Cloud } from 'lucide-react';

import './App.css';

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  // feelsLike: number;
  condition: number;
  humidity: number;
  windSpeed: number;
  icon: string;
  forecast: ForecastDay[];
}

export interface ForecastDay {
  day: any; //string
  temp: number;
  condition: number;
  icon: string;
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (city: string) => {
    console.log('estoy buscando');
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
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m,windspeed_10m`
      );

      const weatherData = await weatherRes.json();

      setWeatherData({
        city: name,
        country,
        temperature: weatherData.current_weather.temperature,
        condition: weatherData.current_weather.weathercode,
        humidity: weatherData.hourly.relativehumidity_2m[0],
        windSpeed: weatherData.current_weather.windspeed,
        icon: '',
        // icon: getWeatherIcon(weatherData.current_weather.weathercode),
        forecast: [],
      });
    } catch (err) {
      setError('Error fetching weather');
    } finally {
      setLoading(false);
    }
  }

  // const mockData: WeatherData = {
  //   city: 'Madrid',
  //   country: 'US',
  //   temperature: Math.round(Math.random() * 20 + 10),
  //   feelsLike: Math.round(Math.random() * 20 + 10),
  //   condition: ['Clear', 'Clouds', 'Rain', 'Snow', 'Mist'][
  //     Math.floor(Math.random() * 5)
  //   ],
  //   humidity: Math.round(Math.random() * 40 + 40),
  //   windSpeed: Math.round(Math.random() * 10 + 5),
  //   icon: '01d',
  //   forecast: [
  //     { day: 'Mon', temp: 18, condition: 'Clear', icon: '01d' },
  //     { day: 'Tue', temp: 20, condition: 'Clouds', icon: '02d' },
  //     { day: 'Wed', temp: 16, condition: 'Rain', icon: '10d' },
  //     { day: 'Thu', temp: 19, condition: 'Clear', icon: '01d' },
  //     { day: 'Fri', temp: 21, condition: 'Clouds', icon: '02d' },
  //   ],
  // };

  console.log(weatherData);

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
        <div className="mt-16 text-center">
          <Cloud className="w-24 h-24 mx-auto text-purple-300 mb-6" />
          <p className="text-purple-400 text-lg">
            Enter a city name to get started
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
