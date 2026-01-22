import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchWeather } from '../services/fetchWeather';
import { SearchBar } from '../components/SearchBar';
import { WeatherDisplay } from '../components/WeatherDisplay';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { WelcomeState } from '../components/WelcomeState';
import type { WeatherData } from '../types/weather';

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
    setError(null);
    setLoading(true);
    setWeatherData(null);

    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
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
      {/* Welcome State */}
      {!weatherData && !loading && !error && <WelcomeState />}

      {/* Error  */}
      {error && <ErrorMessage error={error} />}

      {/* Loading State */}
      {loading && <Loading />}

      {/* Weather Display */}
      {weatherData && !loading && <WeatherDisplay weatherData={weatherData} />}
    </div>
  );
}

export default HomePage;
