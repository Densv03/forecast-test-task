import { Precipitation } from './precipitation.model';
import { MainWeather } from './main-weather.model';
import { Weather } from './weather.model';
import { Clouds } from './clouds.model';
import { Wind } from './wind.model';
import { Sys } from './sys.model';

export interface WeatherData {
  dt: number;
  main: MainWeather;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Precipitation;
  snow?: Precipitation;
  sys: Sys;
  dt_txt: string;
}
