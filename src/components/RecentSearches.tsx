interface RecentSearchesProps {
  recentCities: string[];
  onSelect: (city: string) => void;
}

export function RecentSearches({
  recentCities,
  onSelect,
}: RecentSearchesProps) {
  return (
    <div className="mt-6">
      <h3 className="text-purple-900 mb-2">Recent Searches</h3>
      <div className="flex flex-wrap gap-2">
        {recentCities.map((city) => (
          <button
            key={city}
            onClick={() => onSelect(city)}
            className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}
