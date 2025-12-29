export const getWeatherText = (code: number) => {
  if (code === 0) {
    return <span>Clear</span>;
  }
  if (code <= 2) {
    return <span>Cloudy</span>;
  }

  if (code <= 48) {
    return <span>Drizzle</span>;
  }

  if (code <= 67) {
    return <span>Rainy</span>;
  }

  if (code <= 77) {
    return <span>Snowy</span>;
  }

  return <span>Cloudy</span>;
};
