import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosGeneralesAdmin3Component } from './datos-generales-admin-3.component';

describe('DatosGeneralesAdmin3Component', () => {
  let component: DatosGeneralesAdmin3Component;
  let fixture: ComponentFixture<DatosGeneralesAdmin3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosGeneralesAdmin3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosGeneralesAdmin3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
