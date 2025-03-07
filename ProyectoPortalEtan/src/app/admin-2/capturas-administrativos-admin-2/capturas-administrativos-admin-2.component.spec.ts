import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturasAdministrativosAdmin2Component } from './capturas-administrativos-admin-2.component';

describe('CapturasAdministrativosAdmin2Component', () => {
  let component: CapturasAdministrativosAdmin2Component;
  let fixture: ComponentFixture<CapturasAdministrativosAdmin2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapturasAdministrativosAdmin2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapturasAdministrativosAdmin2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
