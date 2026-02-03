import { useState } from 'react';
import type { WeatherData } from '../types/weather';
import { fetchWeather } from '../services/fetchWeather';

const STORAGE_KEY = 'weatherData:v1';
const RECENT_KEY = 'recentCities:v1';
const MAX_RECENT = 5;

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
  const [recentCities, setRecentCities] = useState<string[]>(() => {
    try {
      const storedData = localStorage.getItem(RECENT_KEY);
      return storedData ? (JSON.parse(storedData) as string[]) : [];
    } catch {
      localStorage.removeItem(RECENT_KEY);
      return [];
    }
  });

  const addRecentCity = (city: string) => {
    setRecentCities((prev) => {
      const cleanedCity = city.trim();
      const updated = [
        cleanedCity,
        ...prev.filter(
          (c) => c.toLocaleLowerCase() !== cleanedCity.toLocaleLowerCase(),
        ),
      ].slice(0, MAX_RECENT);

      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const searchCity = async (city: string): Promise<void> => {
    if (!city.trim()) return;

    setWeatherData(null);

    try {
      setLoading(true);
      setError(null);
      const weather = await fetchWeather(city);
      setWeatherData(weather);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(weather));
      addRecentCity(city);
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
    recentCities,
  };
}
