import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioMaestroComponent } from './inicio-maestro.component';

describe('InicioMaestroComponent', () => {
  let component: InicioMaestroComponent;
  let fixture: ComponentFixture<InicioMaestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioMaestroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
