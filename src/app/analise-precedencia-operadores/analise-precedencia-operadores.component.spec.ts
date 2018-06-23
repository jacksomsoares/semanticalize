import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisePrecedenciaOperadoresComponent } from './analise-precedencia-operadores.component';

describe('AnalisePrecedenciaOperadoresComponent', () => {
  let component: AnalisePrecedenciaOperadoresComponent;
  let fixture: ComponentFixture<AnalisePrecedenciaOperadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalisePrecedenciaOperadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalisePrecedenciaOperadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
