import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APOPasso6Component } from './apopasso6.component';

describe('APOPasso6Component', () => {
  let component: APOPasso6Component;
  let fixture: ComponentFixture<APOPasso6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ APOPasso6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(APOPasso6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
