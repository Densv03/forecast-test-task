import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';

import { BaseResponse } from '@shared/model/base-response.model';
import { TableView } from '@shared/model/table-view.model';

@Component({
  selector: 'app-forecast-table',
  imports: [
    DatePipe,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './forecast-table.component.html',
  styleUrl: './forecast-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastTableComponent {
  public dataSource: InputSignal<BaseResponse<TableView[]>> = input.required<BaseResponse<TableView[]>>();
  public displayedColumns: InputSignal<string[]> = input.required<string[]>();
}
