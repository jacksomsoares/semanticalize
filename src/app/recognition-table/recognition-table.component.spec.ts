import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecognitionTableComponent } from './recognition-table.component';

describe('RecognitionTableComponent', () => {
  let component: RecognitionTableComponent;
  let fixture: ComponentFixture<RecognitionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecognitionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecognitionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
