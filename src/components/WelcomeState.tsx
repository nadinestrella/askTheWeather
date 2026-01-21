import { Cloud } from 'lucide-react';

export function WelcomeState() {
  return (
    <div className="mt-16 text-center">
      <Cloud className="w-24 h-24 mx-auto text-purple-300 mb-6" />
      <p className="text-purple-400 text-lg">
        Enter a city name to get started
      </p>
    </div>
  );
}
