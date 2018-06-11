import { Component, OnInit, Input } from '@angular/core';

import {Grammar} from '../Classes/Grammar'
import {PreditiveTable} from '../Classes/PreditiveTable'
import {RecognitionTable} from '../Classes/RecognitionTable'
import { First } from '../Classes/First';
import { Follow } from '../Classes/Follow';

@Component({
  selector: 'app-recognition-table',
  templateUrl: './recognition-table.component.html',
  styleUrls: ['./recognition-table.component.css']
})
export class RecognitionTableComponent implements OnInit {
  @Input() grammar: string;  
  
  public inputRecog = "i+i*i"; 
  public tableRow: Array<Array<string>>;
  private preditiveTable = new PreditiveTable();    

  constructor() {
   }

  ngOnInit() {
  }

  reconize(): void {
      let grammar = new Grammar(this.grammar);
      this.preditiveTable = new PreditiveTable();
      const first = new First(grammar);
      const follow = new Follow(grammar);
      //this.preditiveTable.mockData();
      this.preditiveTable.generate(grammar, first, follow);
      let rcTable = new RecognitionTable();
      rcTable.reconize(this.inputRecog, this.preditiveTable, grammar);
      this.tableRow = rcTable.tableRows;
  }

}
