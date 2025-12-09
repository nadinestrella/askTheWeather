import { Cloud } from 'lucide-react';
import './App.css';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { WeatherDisplay } from './components/WeatherDisplay';
import { useState } from 'react';

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  forecast: ForecastDay[];
}

export interface ForecastDay {
  day: string;
  temp: number;
  condition: string;
  icon: string;
}

function App() {
  const [weatherData, setWeatherData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Header />

        <SearchBar />

        {/* Welcome State */}
        <div className="mt-16 text-center">
          <Cloud className="w-24 h-24 mx-auto text-purple-300 mb-6" />
          <p className="text-purple-400 text-lg">
            Enter a city name to get started
          </p>
        </div>
      </div>
      <WeatherDisplay />
    </div>
  );
}

export default App;
