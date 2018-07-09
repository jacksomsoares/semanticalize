import { Component, OnInit, Input } from '@angular/core';

import {GrammarV2} from '../Classes/GrammarV2';
import {OperatorPrecedenceParser} from '../Classes/operator-precedence-parser';

@Component({
  selector: 'app-apopasso3',
  templateUrl: './apopasso3.component.html',
  styleUrls: ['./apopasso3.component.css']
})
export class APOPasso3Component implements OnInit {
  @Input() grammar: string;
  public inputRecog = "id&id/id"; 
  public tableRow = Array<{stack: string, relation: string, input: string, handle: string, action: string}>();

  constructor() { }

  ngOnInit() {
  }

  recognize(){
    let grammar = new GrammarV2(this.grammar);
    let stepOne = new OperatorPrecedenceParser();
    stepOne.grammar = grammar;
    
    /*
    for(let nt of grammar.naoTerminais) {
      let obj = {NT: "", first: "", last: ""};
      obj.NT = nt;
      obj.first = stepOne.leading.get(nt).toString();
      obj.last = stepOne.trailing.get(nt).toString();
      this.tableRow.push(obj);
    } */
    
    let tableData = stepOne.RecognitionTable();
    for (let row of tableData.log){
      let obj = {stack: "", relation: "", input: "", handle: "", action: ""};
      obj.stack = row[0];
      obj.relation = row[1];
      obj.input = row[2];
      obj.handle = row[3];
      obj.action = row[4];
      this.tableRow.push(obj);
    }
  }

}
