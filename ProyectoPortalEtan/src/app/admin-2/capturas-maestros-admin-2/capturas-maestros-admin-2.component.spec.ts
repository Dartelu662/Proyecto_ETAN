import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturasMaestrosAdmin2Component } from './capturas-maestros-admin-2.component';

describe('CapturasMaestrosAdmin2Component', () => {
  let component: CapturasMaestrosAdmin2Component;
  let fixture: ComponentFixture<CapturasMaestrosAdmin2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapturasMaestrosAdmin2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapturasMaestrosAdmin2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
