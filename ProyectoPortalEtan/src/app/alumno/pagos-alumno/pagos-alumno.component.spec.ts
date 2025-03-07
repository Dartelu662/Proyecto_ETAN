import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosAlumnoComponent } from './pagos-alumno.component';

describe('PagosAlumnoComponent', () => {
  let component: PagosAlumnoComponent;
  let fixture: ComponentFixture<PagosAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagosAlumnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagosAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
