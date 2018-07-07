import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analise-precedencia-operadores',
  templateUrl: './analise-precedencia-operadores.component.html',
  styleUrls: ['./analise-precedencia-operadores.component.css']
})
export class AnalisePrecedenciaOperadoresComponent implements OnInit {

  textArea: String =
    `E -> E / T | T 
T -> T & F | F
F -> (E) | id`;

  constructor() { }

  ngOnInit() {
  }

}
