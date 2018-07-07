import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APOPasso2Component } from './apopasso2.component';

describe('APOPasso2Component', () => {
  let component: APOPasso2Component;
  let fixture: ComponentFixture<APOPasso2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ APOPasso2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(APOPasso2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
