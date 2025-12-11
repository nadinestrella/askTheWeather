import type { WeatherData } from '../App';
import { ForecastCard } from './ForecastCard';

interface WeatherDisplayProps {
  mockData: WeatherData;
}
export function WeatherDisplay({ mockData }: WeatherDisplayProps) {
  return (
    <div className="mt-8 space-y-6">
      {/* Main Weather Card */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-purple-100">
        <div className="text-center mb-6">
          <h2 className="text-purple-900 mb-2">
            {mockData.city}, {mockData.country}
          </h2>
          <p className="text-purple-600 capitalize">{mockData.condition}</p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <div className="text-8xl text-purple-900">
            {mockData.temperature}°
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-purple-100">
        <h3 className="text-purple-900 mb-6">5-Day Forecast</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <ForecastCard />
        </div>
      </div>
    </div>
  );
}
