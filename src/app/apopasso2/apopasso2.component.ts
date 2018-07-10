import { Component, OnInit, Input } from '@angular/core';
import { GrammarV2 } from '../Classes/GrammarV2';
import { MenorPrecedencia } from '../Classes/menor-precedencia';
import { OperatorPrecedenceParser } from '../Classes/operator-precedence-parser';
import { MaiorPrecedencia } from '../Classes/maior-precedencia';
import { Table } from '../Classes/Table';

@Component({
  selector: 'app-apopasso2',
  templateUrl: './apopasso2.component.html',
  styleUrls: ['./apopasso2.component.css']
})
export class APOPasso2Component implements OnInit {
  @Input() grammar: string;
  public tableHeaderP2: string[];
  public tableHeaderP3: string[];
  public aux: string[];
  public tableHead: Array<string>;
  public tableRowP2: Array<Array<string>>;
  public tableRowP3: Array<Array<string>>;
  public tableRowMaiorMarcador: Array<Array<string>>;
  public tableRowMenorMarcador: Array<Array<string>>;
  public tableRow: Array<Array<string>>;
  public menorprecedencia: Map<String, Array<string>>;
  public maiorprecedencia: Map<String, Array<string>>;
  constructor() {
    this.tableRowMaiorMarcador = [];
    this.tableRowMenorMarcador = [];
    this.menorprecedencia = new Map<String, Array<string>>();
    this.maiorprecedencia = new Map<String, Array<string>>();
    this.tableHead = [];
    this.tableRow = [];
    this.aux = [];
  }

  doLoad() {
    this.doStepTwo();
    this.doStepTree();
    this.doCreateTable();
  }

  doCreateTable() {
    const tb = new Table();
    const grammar = new GrammarV2(this.grammar);
    // let stepTwo = new MenorPrecedencia();
    // let stepOne = new OperatorPrecedenceParser();
    // let stepTree = new MaiorPrecedencia();
    // stepOne.FirstStep(grammar);

    this.tableHead = tb.getHeaderTable(grammar);
    let table = new Map<string, Map<string, string>>();
    //table = tb.getMapTable(this.grammar);
    this.tableRow = tb.getRowTable(this.grammar);
    table = tb.getMapTable(this.grammar);

  }

  doStepTwo() {

    let grammar = new GrammarV2(this.grammar);
    let stepTwo = new MenorPrecedencia();
    stepTwo.findTNT(grammar);

    this.tableHeaderP2 = stepTwo.listaTNT;
    this.tableRowP2 = [];
    this.tableRowMenorMarcador = [];

    this.menorprecedencia = stepTwo.getMenorPrecedencia(this.grammar);
    this.tableRowMenorMarcador = stepTwo.getTableRowMenorMarcador(this.grammar);

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
    stepTree.findNTT(grammar);
    this.tableHeaderP3 = stepTree.listaNTT;
    this.tableRowP3 = [];
    this.tableRowMaiorMarcador = [];

    this.maiorprecedencia = stepTree.getMaiorPrecedencia(this.grammar);
    this.tableRowMaiorMarcador = stepTree.getTableRowMaiorMarcador(this.grammar);

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


