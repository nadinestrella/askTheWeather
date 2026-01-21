import type { WeatherData } from '../pages/HomePage';

export async function fetchWeather(city: string): Promise<WeatherData> {
  // 1 Find lat/lon by city
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}`
  );

  if (!geoRes.ok) {
    throw new Error('Geocoding API error');
  }

  const geoData = await geoRes.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error('City not found');
  }

  const { name, country, latitude, longitude } = geoData.results[0];

  // 2 Find weather

  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&hourly=relativehumidity_2m,windspeed_10m&timezone=auto`
  );

  if (!weatherRes.ok) {
    throw new Error('Weather API error');
  }

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

  return {
    city: name,
    country,
    temperature: weatherData.current_weather.temperature,
    condition: weatherData.current_weather.weathercode,
    forecast,
  };
}
