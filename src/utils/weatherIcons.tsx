import { Cloud, CloudDrizzle, CloudRain, CloudSnow, Sun } from 'lucide-react';

export const getWeatherIcon = (code: number) => {
  if (code === 0) {
    return <Sun className="w-8 h-8 text-yellow-500" />;
  }
  if (code <= 2) {
    return <Cloud className="w-8 h-8 text-gray-400" />;
  }

  if (code <= 48) {
    return <CloudDrizzle className="w-8 h-8 text-gray-400" />;
  }

  if (code <= 67) {
    return <CloudRain className="w-8 h-8 text-blue-500" />;
  }

  if (code <= 77) {
    return <CloudSnow className="w-8 h-8 text-blue-300" />;
  }

  return <Cloud className="w-8 h-8 text-gray-400" />;
};
