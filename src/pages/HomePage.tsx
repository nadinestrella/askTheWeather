import { Link } from 'react-router-dom';
import { useWeather } from '../hooks/useWeather';
import { SearchBar } from '../components/SearchBar';
import { WeatherDisplay } from '../components/WeatherDisplay';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { WelcomeState } from '../components/WelcomeState';
import { RecentSearches } from '../components/RecentSearches';

function HomePage() {
  const { weatherData, error, loading, searchCity, recentCities } =
    useWeather();

  return (
    <div className="flex flex-col lg:flex-row gap-8">
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
        {/* RecentSearches--Mobile */}
        <div className="lg:hidden mt-6">
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
      {/* RecentSearches-- Pc */}
      <div className="lg:sticky lg:calc(var(--spacing) * 17)">
        {recentCities.length > 0 && (
          <RecentSearches recentCities={recentCities} onSelect={searchCity} />
        )}
      </div>
    </div>
  );
}

export default HomePage;
