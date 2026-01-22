export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: number;
  forecast: ForecastDay[];
}

export interface ForecastDay {
  day: string;
  temp: number;
  condition: number;
}
