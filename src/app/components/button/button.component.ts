import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ NgOptimizedImage, CommonModule ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  buttonText = input<string> ('');
  iconSrc = input<string> ('');
  stockName = input<string> ('');

  onClickHandler(buttonText: string): void {
    switch(buttonText) {
      case 'Buy':
        console.log('you have bougth stocks in ' + this.stockName());
        break;
      case 'Sell':
        console.log('you have sold stocks in ' + this.stockName());
        break;
    }
  }
}
