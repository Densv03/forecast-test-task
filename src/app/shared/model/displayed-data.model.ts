import { WeatherData } from './weather-data.model';

export interface DisplayedData {
  data: WeatherData[];
  error: string | null;
}
