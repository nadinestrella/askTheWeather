import type { WeatherData } from '../App';
import { getWeatherIcon } from '../utils/weatherIcons';
import { ForecastCard } from './ForecastCard';

interface WeatherDisplayProps {
  weatherData: WeatherData;
}
export function WeatherDisplay({ weatherData }: WeatherDisplayProps) {
  console.log(weatherData);
  return (
    <div className="mt-8 space-y-6">
      {/* Main Weather Card */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-purple-100">
        <div className="text-center mb-6 flex flex-col items-center">
          <h2 className="text-purple-900 mb-2">
            {weatherData.city}, {weatherData.country}
          </h2>
          <p className="text-purple-600 capitalize mt-2 ">
            {getWeatherIcon(weatherData.condition)}
          </p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <div className="text-8xl text-purple-900">
            {weatherData.temperature}°
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-purple-100">
        <h3 className="text-purple-900 mb-6">5-Day Forecast</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {weatherData.forecast.map((day, index) => (
            <ForecastCard day={day} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
