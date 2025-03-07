import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturasAlumnosAdmin2Component } from './capturas-alumnos-admin-2.component';

describe('CapturasAlumnosAdmin2Component', () => {
  let component: CapturasAlumnosAdmin2Component;
  let fixture: ComponentFixture<CapturasAlumnosAdmin2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapturasAlumnosAdmin2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapturasAlumnosAdmin2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
