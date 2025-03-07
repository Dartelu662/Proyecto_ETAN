import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturasAdministrativosAdmin1Component } from './capturas-administrativos-admin-1.component';

describe('CapturasAdministrativosAdmin1Component', () => {
  let component: CapturasAdministrativosAdmin1Component;
  let fixture: ComponentFixture<CapturasAdministrativosAdmin1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapturasAdministrativosAdmin1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapturasAdministrativosAdmin1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
