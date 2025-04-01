import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { admin1Guard } from './admin-1.guard';

describe('admin1Guard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => admin1Guard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
