import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosMaestroComponent } from './cursos-maestro.component';

describe('CursosMaestroComponent', () => {
  let component: CursosMaestroComponent;
  let fixture: ComponentFixture<CursosMaestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursosMaestroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
