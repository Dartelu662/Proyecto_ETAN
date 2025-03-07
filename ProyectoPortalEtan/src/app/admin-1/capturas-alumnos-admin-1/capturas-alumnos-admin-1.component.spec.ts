import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturasAlumnosAdmin1Component } from './capturas-alumnos-admin-1.component';

describe('CapturasAlumnosAdmin1Component', () => {
  let component: CapturasAlumnosAdmin1Component;
  let fixture: ComponentFixture<CapturasAlumnosAdmin1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapturasAlumnosAdmin1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapturasAlumnosAdmin1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
