import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosGeneralesAdmin2Component } from './datos-generales-admin-2.component';

describe('DatosGeneralesAdmin2Component', () => {
  let component: DatosGeneralesAdmin2Component;
  let fixture: ComponentFixture<DatosGeneralesAdmin2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosGeneralesAdmin2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosGeneralesAdmin2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
