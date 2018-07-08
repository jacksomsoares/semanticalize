import { Component, OnInit, Input } from '@angular/core';
import { GrammarV2 } from '../Classes/GrammarV2';
import { MenorPrecedencia } from '../Classes/menor-precedencia';
import { OperatorPrecedenceParser } from '../Classes/operator-precedence-parser';

@Component({
  selector: 'app-apopasso2',
  templateUrl: './apopasso2.component.html',
  styleUrls: ['./apopasso2.component.css']
})
export class APOPasso2Component implements OnInit {
  @Input() grammar: string;
  public tableHeader: string[];
  public tableRow: Array<Array<string>>;
  public lineprecedencia: Map<String, Array<string>>;
  constructor() {
    this.lineprecedencia = new Map<String, Array<string>>;
  }

  doStepTwo() {

    let grammar = new GrammarV2(this.grammar);
    let stepTwo = new MenorPrecedencia();
    let stepOne = new OperatorPrecedenceParser();

    stepOne.FirstStep(grammar);

    stepTwo.findTNT(grammar);
    this.tableHeader = stepTwo.listaTNT;
    this.tableRow = [];

    let maior: number = 0;

    for (let x = 0; x < this.tableHeader.length; x++) {

      let a = stepOne.leading.get(this.tableHeader[x].toString().split("")[1]).toString().split(",");

      if (a.length > maior) {
        maior = a.length;
      }

    }

    // let temp1 = new Array<string>;
    // temp1.push("/<&");
    // temp1.push("/<(");
    // temp1.push("/<id");
    // this.lineprecedencia.set('T', temp1);

    // let temp2 = new Array<string>;
    // temp2.push("& < (");
    // temp2.push("& < id");
    // this.lineprecedencia.set('F', temp2);

    // let temp3 = new Array<string>;
    // temp3.push("( < /");
    // temp3.push("( < & ");
    // temp3.push("( < (");
    // temp3.push("( < id");
    // this.lineprecedencia.set('E', temp3);

    for (let x = 0; x < this.tableHeader.length; x++) {
      let precedencia = this.tableHeader[x].toString().split("");
      let temp3 = new Array<string>;
      let letra = stepOne.leading.get(precedencia[1]).toString();

      const array = letra.split(",");
      for (let x = 0; x < array.length; x++) {
        const string_aux = precedencia[0].toString() + "<" + array[x];
        temp3.push(string_aux);
      }
      this.lineprecedencia.set(precedencia[1], temp3);

    }

    for (let x = 0; x < this.tableHeader.length; x++) {
      let precedencia = this.tableHeader[x].toString().split("");
      let tableLine = [];
      this.lineprecedencia.forEach((value, key) => {
        if (precedencia[1] === key) {
          for (let x = 0; x < value.length; x++) {
            tableLine.push(value[x]);
          }
        }
      });
      this.tableRow.push(tableLine);
    }
  }

  public getMaior() {



  }

  ngOnInit() {
  }

}


