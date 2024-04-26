import { TestBed } from '@angular/core/testing';

import { FinanceAppService } from './finance-app.service';

describe('FinanceAppService', () => {
  let service: FinanceAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanceAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
