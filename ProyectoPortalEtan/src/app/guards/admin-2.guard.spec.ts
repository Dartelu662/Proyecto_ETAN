import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { admin2Guard } from './admin-2.guard';

describe('admin2Guard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => admin2Guard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
