import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturasAvionesAdmin1Component } from './capturas-aviones-admin-1.component';

describe('CapturasAvionesAdmin1Component', () => {
  let component: CapturasAvionesAdmin1Component;
  let fixture: ComponentFixture<CapturasAvionesAdmin1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapturasAvionesAdmin1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapturasAvionesAdmin1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
