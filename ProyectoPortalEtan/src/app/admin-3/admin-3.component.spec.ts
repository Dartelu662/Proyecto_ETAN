import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Admin3Component } from './admin-3.component';

describe('Admin3Component', () => {
  let component: Admin3Component;
  let fixture: ComponentFixture<Admin3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Admin3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Admin3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
