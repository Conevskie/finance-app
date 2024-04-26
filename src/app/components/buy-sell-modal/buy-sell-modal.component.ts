import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { StockData } from '../../services/finance-app.service';

@Component({
  selector: 'app-buy-sell-modal',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './buy-sell-modal.component.html',
  styleUrl: './buy-sell-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuySellModalComponent {
  @Input() item!: StockData;
  @Output() closeModalEvent: EventEmitter<void> = new EventEmitter<void>();

  closeModal() {
    this.closeModalEvent.emit();
  }

  buyStock() {
    console.log("You have bought stocks at a change of: " + this.item.percentPerChangeToday);
  }

  sellStock() {
    console.log("You have sold stocks at a change of: " + this.item.percentPerChangeToday);
  }
}
