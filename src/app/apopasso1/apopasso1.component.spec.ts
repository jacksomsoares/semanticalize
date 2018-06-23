import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APOPasso1Component } from './apopasso1.component';

describe('APOPasso1Component', () => {
  let component: APOPasso1Component;
  let fixture: ComponentFixture<APOPasso1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ APOPasso1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(APOPasso1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
