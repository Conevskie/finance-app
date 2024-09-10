import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, computed, effect, inject, signal, viewChild } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  financeAppService = inject(FinanceAppService);
  columnName: any = ['Name', 'Change Today', 'Price', ''];
  buttons = [
    {
      buttonText: 'Buy',
      iconSrc: 'assets/images/buy-icon.webp'
    },
    {
      buttonText: 'Sell',
      iconSrc: 'assets/images/sell-icon.webp'
    }
  ];

  // This should be signal as well
  searchInput: string = '';
  state = signal<{ filteredResults: Stock[] | [], selectedModalItem: Stock | null }>({
    filteredResults: [],
    selectedModalItem: null
  });
  private searchField = viewChild.required<ElementRef<HTMLInputElement>>('searchField')

  constructor() {
    this.financeAppService.getMockData()
      .pipe(takeUntilDestroyed())
      .subscribe(data => {
        this.state.update(oldData => {
          const selectedItemInFilteredResults = oldData.filteredResults.find(item => item.name === oldData.selectedModalItem?.name);
          return {
            filteredResults: data,
            selectedModalItem: selectedItemInFilteredResults ?? null
          }
        });
      });

    // This should not go in a template
    // effect(() => {
    //   this.searchField().nativeElement.focus();
    // })
  }

  openModal(record: Stock): void {
    this.state.update(oldData => ({ ...oldData, selectedModalItem: record }));
  }

  closeModal(): void {
    this.state.update(oldData => ({ ...oldData, selectedModalItem: null }));
  }
}
