import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Stock } from '../../services/finance-app.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-buy-sell-modal',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, ButtonComponent],
  templateUrl: './buy-sell-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuySellModalComponent implements OnChanges{
  @Input() item!: Stock | null;
  @Output() closeModalEvent = new EventEmitter<void>();

  currentPrice!: number;
  percentChangeToday!: number;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.currentPrice = this.item?.price || 0;
      this.percentChangeToday = this.item?.percentPerChangeToday || 0;
    }
  }
  
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

  closeModal(): void {
    this.closeModalEvent.emit();
  }
}
