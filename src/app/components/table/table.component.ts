import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { BuySellModalComponent } from '../buy-sell-modal/buy-sell-modal.component';
import { FinanceAppService, StockData } from '../../services/finance-app.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ NgOptimizedImage, CommonModule, BuySellModalComponent ,FormsModule ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnDestroy {
  financeAppService = inject(FinanceAppService);
  private intervalId: any;
  columnName: any = ['Name', 'Change Today', 'Price', ''];
  actionButtons: any = [
    {
      name: "Buy",
      src: "assets/images/buy-icon.webp",
      alt: "#",
      color: "green"
    },
    {
      name: "Sell",
      src: "assets/images/sell-icon.webp",
      alt: "#",
      color: "red"
    },
  ];
  isModalOpened: boolean = false;
  modalItem!: StockData;
  searchInput : string = '';
  
  filteredMockData = computed(() => {
    return this.financeAppService.mockData().filter(item => item.name.toLowerCase().includes(this.searchInput.toLowerCase()));
  })

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.financeAppService.mockData.update(item => {
        item.forEach(key => key.changeToday = this.addRandomValueToNumber(key.changeToday));
        item.forEach(key => key.percentPerChangeToday = this.calculatePercentageChange(key.price, key.changeToday));
        return [...item]
      })
    }, 3000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  addRandomValueToNumber(inputNumber: number): number {
    const randomValue = Math.floor(Math.random() * 20) - 10;
    let result = inputNumber + randomValue;
    result = parseFloat(result.toFixed(2));
    return result;
  }

  calculatePercentageChange(price: number, priceChange: number): number {
    const newPrice = price + priceChange;
    const percentageChange = ((newPrice - price) / Math.abs(price)) * 100;
    const roundedPercentageChange = parseFloat(percentageChange.toFixed(2));
    return roundedPercentageChange;
  }

  openModal(record: StockData) {
    this.modalItem = record;
    this.isModalOpened = true;
  }

  closeModal() {
    this.isModalOpened = false;
    }
}
