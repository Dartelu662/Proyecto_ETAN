import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturasCursosAdmin2Component } from './capturas-cursos-admin-2.component';

describe('CapturasCursosAdmin2Component', () => {
  let component: CapturasCursosAdmin2Component;
  let fixture: ComponentFixture<CapturasCursosAdmin2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapturasCursosAdmin2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapturasCursosAdmin2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
