import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturasEscolarAdmin1Component } from './capturas-escolar-admin-1.component';

describe('CapturasEscolarAdmin1Component', () => {
  let component: CapturasEscolarAdmin1Component;
  let fixture: ComponentFixture<CapturasEscolarAdmin1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapturasEscolarAdmin1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapturasEscolarAdmin1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
