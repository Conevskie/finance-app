import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
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
  item = input<StockData>();
  closeModalEvent = output<void>();

  closeModal(): void {
    this.closeModalEvent.emit();
  }

  buyStock(): void {
    console.log("You have bought stocks at a change of: " + this.item()!.percentPerChangeToday);
  }

  sellStock(): void {
    console.log("You have sold stocks at a change of: " + this.item()!.percentPerChangeToday);
  }
}
