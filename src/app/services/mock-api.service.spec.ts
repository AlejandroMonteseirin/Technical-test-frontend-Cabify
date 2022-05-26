import { TestBed } from '@angular/core/testing';

import { MockApiService } from './mock-api.service';

describe('MockApiService', () => {
  let service: MockApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('return the mock data TSHIRT', async () => {
    
    await service.getProductsApi().then((res)=>{
      expect(res['TSHIRT']!=undefined && res['TSHIRT'].price==20).toBeTruthy();
    })
  });

  it('return the rule data 2x1 MUG', async () => {
    
    await service.getRulesApi().then((res)=>{
      expect(res['MUG']!=undefined).toBeTruthy();
    })
  });
});
