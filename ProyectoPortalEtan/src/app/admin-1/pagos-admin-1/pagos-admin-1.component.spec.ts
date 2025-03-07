import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosAdmin1Component } from './pagos-admin-1.component';

describe('PagosAdmin1Component', () => {
  let component: PagosAdmin1Component;
  let fixture: ComponentFixture<PagosAdmin1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagosAdmin1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagosAdmin1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
