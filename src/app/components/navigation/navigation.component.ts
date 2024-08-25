import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [ NgOptimizedImage, CommonModule ],
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  navigationIcons: any = [
    {
      src: 'assets/images/icon-1.webp',
      alt: '#',
      href: '#'
    },
    {
      src: 'assets/images/icon-2.webp',
      alt: '#',
      href: '#'
    },
    {
      src: 'assets/images/icon-3.webp',
      alt: '#',
      href: '#'
    },
    {
      src: 'assets/images/icon-4.webp',
      alt: '#',
      href: '#'
    },
    {
      src: 'assets/images/icon-5.webp',
      alt: '#',
      href: '#'
    },
    {
      src: 'assets/images/icon-6.webp',
      alt: '#',
      href: '#'
    }
  ]

  logo: any = {
    src: 'assets/images/logo.png',
      alt: '#',
      href: '#'
  }

  activeIconIndex: number = 1;
}
