import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Stock } from '../../services/finance-app.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-buy-sell-modal',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, ButtonComponent],
  templateUrl: './buy-sell-modal.component.html',
  styleUrl: './buy-sell-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuySellModalComponent {
  item = input<Stock>();
  closeModalEvent = output<void>();
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

  closeModal(): void {
    this.closeModalEvent.emit();
  }
}
