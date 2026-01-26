import { Link } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { WeatherDisplay } from '../components/WeatherDisplay';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { WelcomeState } from '../components/WelcomeState';

import { useWeather } from '../hooks/useWeather';

function HomePage() {
  const { weatherData, error, loading, searchCity } = useWeather();

  return (
    <div>
      <Link
        to="/ia"
        className="inline-block mt-5 mb-4 px-4 py-2 bg-purple-500 text-white rounded-xl"
      >
        IA Page ✨
      </Link>
      <SearchBar
        onSearch={searchCity}
        loading={loading}
        buttonText="Search Weather"
      />
      {/* Welcome State */}
      {!weatherData && !loading && !error && <WelcomeState />}

      {/* Error  */}
      {error && <ErrorMessage error={error} />}

      {/* Loading State */}
      {loading && <Loading />}

      {/* Weather Display */}
      {weatherData && !loading && <WeatherDisplay weatherData={weatherData} />}
    </div>
  );
}

export default HomePage;
