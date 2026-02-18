export function Loading({ message }: { message?: string }) {
  return (
    <div className="mt-8 text-center">
      <div className="inline-block w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-purple-600">Fetching weather data...</p>
      <p className="mt-4 text-purple-800 font-semibold">{message}</p>
    </div>
  );
}
