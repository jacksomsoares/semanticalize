import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APOPasso4Component } from './apopasso4.component';

describe('APOPasso4Component', () => {
  let component: APOPasso4Component;
  let fixture: ComponentFixture<APOPasso4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ APOPasso4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(APOPasso4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
