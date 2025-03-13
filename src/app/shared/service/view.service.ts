import { computed, inject, Injectable, Signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ForecastService } from '@shared/service/forecast.service';
import { DisplayedData } from '@shared/model/displayed-data.model';
import { TableView } from '@shared/model/table-view.model';
import { WeatherData } from '@shared/model/weather-data.model';
import { BaseResponse } from '@shared/model/base-response.model';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private forecastService = inject(ForecastService);

  public readonly DISPLAYED_COLUMNS = ['date', 'temperature', 'pressure'];

  public dataSource: Signal<DisplayedData> = this.forecastService.forecast

  public tableView: Signal<BaseResponse<TableView[]>> = computed(() => {
    return {
      data: this.dataSource().data.map(this.toTableView),
      error: this.dataSource().error
    }
  });

  public cityControl = new FormControl('', [Validators.required]);

  private toTableView(item: WeatherData): TableView {
    return {
      date: item.dt_txt,
      temperature: item.main.temp,
      pressure: item.main.pressure
    }
  }
}
