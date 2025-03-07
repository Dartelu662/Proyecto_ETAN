import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturasCursosAdmin1Component } from './capturas-cursos-admin-1.component';

describe('CapturasCursosAdmin1Component', () => {
  let component: CapturasCursosAdmin1Component;
  let fixture: ComponentFixture<CapturasCursosAdmin1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapturasCursosAdmin1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapturasCursosAdmin1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
