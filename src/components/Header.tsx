import { Cloud } from 'lucide-react';

export function Header() {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Cloud className="w-10 h-10 text-purple-400" />
        <h1 className="text-purple-900">Ask the Weather</h1>
      </div>

      <p className="text-purple-700 opacity-80">
        Search for any city to get current weather and forecast
      </p>
    </header>
  );
}
