export const getWeatherText = (code: number) => {
  if (code === 0) {
    return <span>Clear</span>;
  }
  if (code <= 2) {
    return <span>Clouds</span>;
  }

  if (code <= 48) {
    return <span>Drizzle</span>;
  }

  if (code <= 67) {
    return <span>Rain</span>;
  }

  if (code <= 77) {
    return <span>Snow</span>;
  }

  return <span>Clouds</span>;
};
