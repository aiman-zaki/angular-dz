import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftWorksComponent } from './shift-works.component';

describe('ShiftWorksComponent', () => {
  let component: ShiftWorksComponent;
  let fixture: ComponentFixture<ShiftWorksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftWorksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
