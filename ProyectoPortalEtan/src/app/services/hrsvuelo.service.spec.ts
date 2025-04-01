import { TestBed } from '@angular/core/testing';

import { HrsvueloService } from './hrsvuelo.service';

describe('HrsvueloService', () => {
  let service: HrsvueloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HrsvueloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
