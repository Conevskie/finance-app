import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { BuySellModalComponent } from '../buy-sell-modal/buy-sell-modal.component';
import { FinanceAppService, Stock } from '../../services/finance-app.service';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, BuySellModalComponent, FormsModule, ButtonComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  financeAppService = inject(FinanceAppService);
  columnName: any = ['Name', 'Change Today', 'Price', ''];
  buttons = [
    {
      buttonColorClass: 'bg-green',
      buttonText: 'Buy',
      iconSrc: 'assets/images/buy-icon.webp'
    },
    {
      buttonColorClass: 'bg-red',
      buttonText: 'Sell',
      iconSrc: 'assets/images/sell-icon.webp'
    }
  ];
  isModalOpened: boolean = false;
  modalItem!: Stock;
  searchInput: string = '';
  mockData = signal<Stock[]>([]);

  filteredMockData = computed(() => {
    return this.mockData()!.filter(item => item.name.toLowerCase().includes(this.searchInput.toLowerCase()));
  });

  constructor() {
    this.financeAppService.getMockData()
      .pipe(takeUntilDestroyed())
      .subscribe(data => {
        this.mockData.set(data);
      });
  }

  openModal(record: Stock): void {
    this.modalItem = record;
    this.isModalOpened = true;
  }

  closeModal(): void {
    this.isModalOpened = false;
  }
}
