import { Link } from 'react-router-dom';
import { useWeather } from '../hooks/useWeather';
import {
  ErrorMessage,
  Loading,
  RecentSearches,
  SearchBar,
  WeatherDisplay,
  WelcomeState,
} from '../components';

function HomePage() {
  const { weatherData, error, loading, searchCity, recentCities } =
    useWeather();

  return (
    <div className="flex flex-col">
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
        {/* RecentCities */}
        <div className="mt-6">
          {recentCities.length > 0 && (
            <RecentSearches recentCities={recentCities} onSelect={searchCity} />
          )}
        </div>

        {/* Welcome State */}
        {!weatherData && !loading && !error && <WelcomeState />}

        {/* Error  */}
        {error && <ErrorMessage error={error} />}

        {/* Loading State */}
        {loading && <Loading />}

        {/* Weather Display */}
        {weatherData && !loading && (
          <WeatherDisplay weatherData={weatherData} />
        )}
      </div>
    </div>
  );
}

export default HomePage;
