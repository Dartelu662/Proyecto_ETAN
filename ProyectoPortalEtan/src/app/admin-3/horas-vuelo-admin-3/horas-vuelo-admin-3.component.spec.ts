import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasVueloAdmin3Component } from './horas-vuelo-admin-3.component';

describe('HorasVueloAdmin3Component', () => {
  let component: HorasVueloAdmin3Component;
  let fixture: ComponentFixture<HorasVueloAdmin3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorasVueloAdmin3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorasVueloAdmin3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
