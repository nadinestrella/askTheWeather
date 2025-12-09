export function Header() {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <span>icon</span>
        <h1 className="text-purple-900">Ask the Weather</h1>
      </div>

      <p className="text-purple-700 opacity-80">
        Search for any city to get current weather and forecast
      </p>
    </header>
  );
}
