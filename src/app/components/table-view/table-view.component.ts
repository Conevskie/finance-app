import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { NgOptimizedImage } from '@angular/common';
import { Stock } from '../../services/finance-app.service';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [ TableComponent, NgOptimizedImage ],
  templateUrl: './table-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableViewComponent {
  tableComponent = viewChild<TableComponent>(TableComponent)

  addNewStock() {
    const newStock: Stock = {
      name: 'New Stock',
      price: 123.45,
      changeToday: 2.15,
      percentPerChangeToday: 1.75,
      abbreviation: 'NS',
      src: 'assets/images/new-stock-icon.webp',
      alt: 'New Stock Icon'
    };

    this.tableComponent()?.addStock(newStock);
  }
}
