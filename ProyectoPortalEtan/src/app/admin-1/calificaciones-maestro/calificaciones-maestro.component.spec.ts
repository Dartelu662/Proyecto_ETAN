import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionesMaestroComponent } from './calificaciones-maestro.component';

describe('CalificacionesMaestroComponent', () => {
  let component: CalificacionesMaestroComponent;
  let fixture: ComponentFixture<CalificacionesMaestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalificacionesMaestroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificacionesMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
