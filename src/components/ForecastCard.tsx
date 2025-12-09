import { Sun } from 'lucide-react';

export function ForecastCard() {
  return (
    <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-4 text-center hover:shadow-md transition-all">
      <p className="text-purple-700 mb-3">Day</p>
      <div className="flex justify-center mb-3">
        <Sun className="w-8 h-8 text-yellow-500" />
      </div>
      <p className="text-purple-900">{30}°</p>
      <p className="text-sm text-purple-600 opacity-80 mt-1">Rainy</p>
    </div>
  );
}
