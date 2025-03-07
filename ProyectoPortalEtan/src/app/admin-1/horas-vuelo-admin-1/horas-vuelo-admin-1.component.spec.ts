import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasVueloAdmin1Component } from './horas-vuelo-admin-1.component';

describe('HorasVueloAdmin1Component', () => {
  let component: HorasVueloAdmin1Component;
  let fixture: ComponentFixture<HorasVueloAdmin1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorasVueloAdmin1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorasVueloAdmin1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
