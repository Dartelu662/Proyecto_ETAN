import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioAdmin3Component } from './inicio-admin-3.component';

describe('InicioAdmin3Component', () => {
  let component: InicioAdmin3Component;
  let fixture: ComponentFixture<InicioAdmin3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioAdmin3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioAdmin3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
