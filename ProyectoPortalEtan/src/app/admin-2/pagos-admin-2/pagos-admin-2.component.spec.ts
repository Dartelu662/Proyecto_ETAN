import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosAdmin2Component } from './pagos-admin-2.component';

describe('PagosAdmin2Component', () => {
  let component: PagosAdmin2Component;
  let fixture: ComponentFixture<PagosAdmin2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagosAdmin2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagosAdmin2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
