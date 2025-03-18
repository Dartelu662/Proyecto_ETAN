import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasVueloAdmin2Component } from './horas-vuelo-admin-2.component';

describe('HorasVueloAdmin2Component', () => {
  let component: HorasVueloAdmin2Component;
  let fixture: ComponentFixture<HorasVueloAdmin2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorasVueloAdmin2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorasVueloAdmin2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
