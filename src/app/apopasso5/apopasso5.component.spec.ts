import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APOPasso5Component } from './apopasso5.component';

describe('APOPasso5Component', () => {
  let component: APOPasso5Component;
  let fixture: ComponentFixture<APOPasso5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ APOPasso5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(APOPasso5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
