import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APOPasso3Component } from './apopasso3.component';

describe('APOPasso3Component', () => {
  let component: APOPasso3Component;
  let fixture: ComponentFixture<APOPasso3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ APOPasso3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(APOPasso3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
