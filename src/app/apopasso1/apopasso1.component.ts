import { Component, OnInit, Input } from '@angular/core';

import {Grammar} from '../Classes/Grammar';
import {GrammarV2} from '../Classes/GrammarV2';
import {OperatorPrecedenceParser} from '../Classes/operator-precedence-parser';

@Component({
  selector: 'app-apopasso1',
  templateUrl: './apopasso1.component.html',
  styleUrls: ['./apopasso1.component.css']
})
export class APOPasso1Component implements OnInit {
  @Input() grammar: string;
  public tableRow = Array<{NT: string, first: string, last: string}>();

  constructor() { }

  ngOnInit() {}

  doStepOne(){
    let grammar = new GrammarV2(this.grammar);
    let stepOne = new OperatorPrecedenceParser();
    stepOne.grammar = grammar;

    stepOne.FirstStep(grammar);
    
    for(let nt of grammar.naoTerminais) {
      let obj = {NT: "", first: "", last: ""};
      obj.NT = nt;
      obj.first = stepOne.leading.get(nt).toString();
      obj.last = stepOne.trailing.get(nt).toString();
      this.tableRow.push(obj);
    }
    
    stepOne.RecognitionTable();
  }

}
