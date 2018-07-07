import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analise-precedencia-operadores',
  templateUrl: './analise-precedencia-operadores.component.html',
  styleUrls: ['./analise-precedencia-operadores.component.css']
})
export class AnalisePrecedenciaOperadoresComponent implements OnInit {

  textArea: String =
    "G = ({ E, T, F}, { /, id, (, ) }, P, E )\n" +
    "p=\n" +
    "E -> E / T | T\n" +
    "T -> T & F | F\n" +
    "F -> (E) | id";

  constructor() { }

  ngOnInit() {
  }

}
