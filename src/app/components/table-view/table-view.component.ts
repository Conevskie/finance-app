import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [ TableComponent, NgOptimizedImage ],
  templateUrl: './table-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableViewComponent {

}
