import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioAdmin2Component } from './inicio-admin-2.component';

describe('InicioAdmin2Component', () => {
  let component: InicioAdmin2Component;
  let fixture: ComponentFixture<InicioAdmin2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioAdmin2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioAdmin2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
