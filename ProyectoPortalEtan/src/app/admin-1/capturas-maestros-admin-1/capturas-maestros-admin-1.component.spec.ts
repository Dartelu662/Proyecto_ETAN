import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturasMaestrosAdmin1Component } from './capturas-maestros-admin-1.component';

describe('CapturasMaestrosAdmin1Component', () => {
  let component: CapturasMaestrosAdmin1Component;
  let fixture: ComponentFixture<CapturasMaestrosAdmin1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapturasMaestrosAdmin1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapturasMaestrosAdmin1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
