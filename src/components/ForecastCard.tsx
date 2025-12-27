import type { ForecastDay } from '../App';
import { getWeatherIcon } from '../utils/weatherIcons';

interface ForecastCardProps {
  day: ForecastDay;
}

export function ForecastCard({ day }: ForecastCardProps) {
  return (
    <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-4 text-center hover:shadow-md transition-all">
      <p className="text-purple-700 mb-3">{day.day}</p>
      <div className="flex justify-center mb-3">
        {getWeatherIcon(day.condition)}
      </div>
      <p className="text-purple-900">{day.temp}°</p>
      <p className="text-sm text-purple-600 opacity-80 mt-1">{day.condition}</p>
    </div>
  );
}
