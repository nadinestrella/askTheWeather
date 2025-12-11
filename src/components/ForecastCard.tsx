import { Cloud, CloudDrizzle, CloudRain, CloudSnow, Sun } from 'lucide-react';
import type { ForecastDay } from '../App';

interface ForecastCardProps {
  day: ForecastDay;
}

export function ForecastCard({ day }: ForecastCardProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'clouds':
        return <Cloud className="w-8 h-8 text-gray-400" />;
      case 'rain':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'snow':
        return <CloudSnow className="w-8 h-8 text-blue-300" />;

      case 'mist':
        return <CloudDrizzle className="w-8 h-8 text-gray-400" />;

      default:
        return <Cloud className="w-8 h-8 text-gray-400" />;
    }
  };

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
