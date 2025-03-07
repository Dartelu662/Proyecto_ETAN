import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturasAvionesAdmin2Component } from './capturas-aviones-admin-2.component';

describe('CapturasAvionesAdmin2Component', () => {
  let component: CapturasAvionesAdmin2Component;
  let fixture: ComponentFixture<CapturasAvionesAdmin2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapturasAvionesAdmin2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapturasAvionesAdmin2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
