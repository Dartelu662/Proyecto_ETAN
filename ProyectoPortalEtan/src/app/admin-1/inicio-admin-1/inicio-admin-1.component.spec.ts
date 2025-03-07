import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioAdmin1Component } from './inicio-admin-1.component';

describe('InicioAdmin1Component', () => {
  let component: InicioAdmin1Component;
  let fixture: ComponentFixture<InicioAdmin1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioAdmin1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioAdmin1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
