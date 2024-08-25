import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Stock } from '../../services/finance-app.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-buy-sell-modal',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, ButtonComponent],
  templateUrl: './buy-sell-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuySellModalComponent {
  item = input<Stock>();
  closeModalEvent = output<void>();
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
