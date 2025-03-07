import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosGeneralesMaestroComponent } from './datos-generales-maestro.component';

describe('DatosGeneralesMaestroComponent', () => {
  let component: DatosGeneralesMaestroComponent;
  let fixture: ComponentFixture<DatosGeneralesMaestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosGeneralesMaestroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosGeneralesMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
