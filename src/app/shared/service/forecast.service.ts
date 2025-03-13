import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, EMPTY, first, Observable, tap } from 'rxjs';

import { environment } from '@env/environment';

import { DisplayedData } from '@shared/model/displayed-data.model';
import { WeatherResponse } from '@shared/model/weather.response.model';
import { BaseResponse } from '@shared/model/base-response.model';
import { WeatherData } from '@shared/model/weather-data.model';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private http = inject(HttpClient);

  private forecastSource: WritableSignal<BaseResponse<WeatherData[]>> = signal({data: [], error: null});
  private isLoadingSource: WritableSignal<boolean> = signal(false);

  public isLoading: Signal<boolean> = this.isLoadingSource.asReadonly();
  public forecast: Signal<DisplayedData> = this.forecastSource.asReadonly();

  public getForecast(q: string): Observable<WeatherResponse> {
    this.isLoadingSource.set(true);

    return this.http.get<WeatherResponse>(`${environment.weatherApi}`, {
      params: {
        q,
        appid: environment.weatherApiKey,
        units: 'metric'
      }
    }).pipe(
      catchError(err => {
        this.forecastSource.set({data: [], error: err.error.message});
        this.isLoadingSource.set(false);
        return EMPTY;
      }),
      first(),
      tap((response: WeatherResponse) => {
        this.forecastSource.set({data: response.list, error: null});
        this.isLoadingSource.set(false);
      }),
    );
  }
}
