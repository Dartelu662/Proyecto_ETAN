import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosGeneralesAdmin1Component } from './datos-generales-admin-1.component';

describe('DatosGeneralesAdmin1Component', () => {
  let component: DatosGeneralesAdmin1Component;
  let fixture: ComponentFixture<DatosGeneralesAdmin1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosGeneralesAdmin1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosGeneralesAdmin1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
