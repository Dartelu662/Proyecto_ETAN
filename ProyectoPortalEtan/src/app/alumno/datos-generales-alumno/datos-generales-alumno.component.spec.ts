import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosGeneralesAlumnoComponent } from './datos-generales-alumno.component';

describe('DatosGeneralesAlumnoComponent', () => {
  let component: DatosGeneralesAlumnoComponent;
  let fixture: ComponentFixture<DatosGeneralesAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosGeneralesAlumnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosGeneralesAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
