import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { ForecastService } from '@shared/service/forecast.service';
import { ViewService } from '@shared/service/view.service';
import { ForecastTableComponent } from '@shared/component/table/forecast-table.component';

@Component({
  selector: 'app-root',
  imports: [
    MatInput,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatFormField,
    MatButton,
    MatProgressSpinner,
    ForecastTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private forecastService = inject(ForecastService);
  private viewService = inject(ViewService);

  public title = 'forecast';
  public cityControl = this.viewService.cityControl;
  public isLoading = this.forecastService.isLoading;
  public dataSource = this.viewService.tableView;

  public displayedColumns = this.viewService.DISPLAYED_COLUMNS;

  public getForecast(): void {
    if (this.cityControl.invalid || !this.cityControl.value) {
      return ;
    }

    this.forecastService.getForecast(this.cityControl.value).subscribe();
  }
}
