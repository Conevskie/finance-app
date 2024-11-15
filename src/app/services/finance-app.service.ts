export interface Stock {
  name: string,
  abbreviation: string,
  changeToday: number,
  percentPerChangeToday: number,
  price: number,
  src: string,
  alt: string
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceAppService {
  readonly http = inject(HttpClient);
  private mockDataUrl: string = 'assets/data/mock-data.json';

  getMockData(): Observable<Stock[]> {
    return timer(0, 3000).pipe(
      switchMap(() => this.http.get<Stock[]>(this.mockDataUrl).pipe(
        map((transformedData) => transformedData.map(item => {
          const changeToday = this.addRandomValueToNumber(item.changeToday);
          const price = this.addRandomValueToNumber(item.price);
          return ({
            ...item,
            changeToday: changeToday,
            price: price,
            percentPerChangeToday: this.calculatePercentageChange(price, changeToday)
          })
        }))
      )
      )
    )
  }

  private addRandomValueToNumber(inputNumber: number): number {
    const randomValue = Math.floor(Math.random() * 20) - 10;
    let result = inputNumber + randomValue;
    result = parseFloat(result.toFixed(2));
    return result;
  }

  private calculatePercentageChange(price: number, priceChange: number): number {
    const newPrice = price + priceChange;
    const percentageChange = ((newPrice - price) / Math.abs(price)) * 100;
    const roundedPercentageChange = parseFloat(percentageChange.toFixed(2));
    return roundedPercentageChange;
  }
}
