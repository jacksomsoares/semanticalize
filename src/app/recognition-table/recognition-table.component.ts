import { Component, OnInit, Input } from '@angular/core';

import {Grammar} from '../Classes/Grammar'
import {PreditiveTable} from '../Classes/PreditiveTable'
import {RecognitionTable} from '../Classes/RecognitionTable'

@Component({
  selector: 'app-recognition-table',
  templateUrl: './recognition-table.component.html',
  styleUrls: ['./recognition-table.component.css']
})
export class RecognitionTableComponent implements OnInit {
  @Input() grammar: string;  
  
  public inputRecog = "id+id*id";  
  public tableRow: Array<Array<string>>;
  private preditiveTable = new PreditiveTable();    

  constructor() {
   }

  ngOnInit() {
  }

  reconize(): void {
      let grammar = new Grammar(this.grammar);
      this.preditiveTable = new PreditiveTable();
      //this.preditiveTable.mockData();
      this.preditiveTable.generate(grammar);
      let rcTable = new RecognitionTable();
      rcTable.reconize(this.inputRecog, this.preditiveTable, grammar);
      this.tableRow = rcTable.tableRows;
  }

}