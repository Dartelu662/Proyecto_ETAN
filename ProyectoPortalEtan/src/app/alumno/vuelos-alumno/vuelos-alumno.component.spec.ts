import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuelosAlumnoComponent } from './vuelos-alumno.component';

describe('VuelosAlumnoComponent', () => {
  let component: VuelosAlumnoComponent;
  let fixture: ComponentFixture<VuelosAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VuelosAlumnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VuelosAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
