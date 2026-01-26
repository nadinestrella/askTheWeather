import { useState } from 'react';
import type { WeatherData } from '../types/weather';
import { fetchWeather } from '../services/fetchWeather';

const STORAGE_KEY = 'weatherData:v1';

export function useWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);

      return storedData ? (JSON.parse(storedData) as WeatherData) : null;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchCity = async (city: string): Promise<void> => {
    if (!city.trim()) return;

    setWeatherData(null);

    try {
      setLoading(true);
      setError(null);
      const weather = await fetchWeather(city);
      setWeatherData(weather);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(weather));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return {
    weatherData,
    loading,
    error,
    searchCity,
  };
}
