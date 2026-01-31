import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesEscolarAdmin2Component } from './informes-escolar-admin-2.component';

describe('InformesEscolarAdmin2Component', () => {
  let component: InformesEscolarAdmin2Component;
  let fixture: ComponentFixture<InformesEscolarAdmin2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformesEscolarAdmin2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformesEscolarAdmin2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
