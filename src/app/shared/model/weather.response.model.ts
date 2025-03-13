import { WeatherData } from './weather-data.model';
import { City } from './city.model';

export interface WeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
  city: City;
}
