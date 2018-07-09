import { Component, OnInit, Input } from '@angular/core';
import { GrammarV2 } from '../Classes/GrammarV2';
import { MenorPrecedencia } from '../Classes/menor-precedencia';
import { OperatorPrecedenceParser } from '../Classes/operator-precedence-parser';
import { MaiorPrecedencia } from '../Classes/maior-precedencia';

@Component({
  selector: 'app-apopasso2',
  templateUrl: './apopasso2.component.html',
  styleUrls: ['./apopasso2.component.css']
})
export class APOPasso2Component implements OnInit {
  @Input() grammar: string;
  public tableHeaderP2: string[];
  public tableHeaderP3: string[];
  public tableRowP2: Array<Array<string>>;
  public tableRowP3: Array<Array<string>>;
  public tableRowMaiorMarcador: Array<Array<string>>;
  public tableRowMenorMarcador: Array<Array<string>>;
  public menorprecedencia: Map<String, Array<string>>;
  public maiorprecedencia: Map<String, Array<string>>;
  constructor() {
    this.menorprecedencia = new Map<String, Array<string>>();
    this.maiorprecedencia = new Map<String, Array<string>>();
  }

  doLoad() {
    this.doStepTwo();
    this.doStepTree();
  }

  doStepTwo() {

    let grammar = new GrammarV2(this.grammar);
    let stepTwo = new MenorPrecedencia();
    let stepOne = new OperatorPrecedenceParser();

    stepOne.FirstStep(grammar);

    stepTwo.findTNT(grammar);
    this.tableHeaderP2 = stepTwo.listaTNT;
    this.tableRowP2 = [];
    this.tableRowMenorMarcador = [];

    for (let x = 0; x < this.tableHeaderP2.length; x++) {
      let precedencia = this.tableHeaderP2[x].toString().split("");
      let precedence_aux = this.tableHeaderP2[x];
      let temp3 = new Array<string>();
      let letra = stepOne.leading.get(precedencia[1]).toString();

      const array = letra.split(',');
      for (let y = 0; y < array.length; y++) {
        if (x === this.tableHeaderP2.length - 1) { //save precedencia marcador menor
          const str = new Array<string>();
          str.push('$' + ' < ' + array[y]);
          this.tableRowMenorMarcador.push(str);
        }

        const string_aux = precedencia[0].toString() + ' < ' + array[y];
        temp3.push(string_aux);
      }
      this.menorprecedencia.set(precedence_aux, temp3);

    }

    for (let x = 0; x < this.tableHeaderP2.length; x++) {
      let precedencia = this.tableHeaderP2[x];
      let tablerow = [];
      this.menorprecedencia.forEach((value, key) => {
        if (precedencia === key) {
          for (let x = 0; x < value.length; x++) {
            tablerow.push(value[x]);
          }
        }
      });
      this.tableRowP2.push(tablerow);
    }

  }

  doStepTree() {

    let grammar = new GrammarV2(this.grammar);
    let stepTree = new MaiorPrecedencia();
    let stepOne = new OperatorPrecedenceParser();

    stepOne.FirstStep(grammar);

    stepTree.findNTT(grammar);
    this.tableHeaderP3 = stepTree.listaNTT;
    this.tableRowP3 = [];
    this.tableRowMaiorMarcador = [];



    for (let x = 0; x < this.tableHeaderP3.length; x++) {
      let precedencia = this.tableHeaderP3[x].toString().split("");
      let precedence_aux = this.tableHeaderP3[x];

      let temp3 = new Array<string>();
      let letra = stepOne.trailing.get(precedencia[0]).toString();

      const array = letra.split(',');
      for (let y = 0; y < array.length; y++) {
        if (x === 0) { //save precedencia marcador maior
          const str = new Array<string>();
          str.push(array[y] + ' > ' + '$');
          this.tableRowMaiorMarcador.push(str);
        }
        const string_aux = array[y] + ' > ' + precedencia[1];
        temp3.push(string_aux);
      }
      this.maiorprecedencia.set(precedence_aux, temp3);

    }

    for (let x = 0; x < this.tableHeaderP3.length; x++) {
      let precedencia = this.tableHeaderP3[x];
      let tablerow = [];
      this.maiorprecedencia.forEach((value, key) => {
        if (precedencia === key) {
          for (let x = 0; x < value.length; x++) {
            tablerow.push(value[x]);
          }
        }
      });
      this.tableRowP3.push(tablerow);
    }
  }

  ngOnInit() {

  }

}


