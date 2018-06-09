import { Component, OnInit, Input } from '@angular/core';
import {Grammar} from '../Classes/Grammar';
import {PreditiveTable} from '../Classes/PreditiveTable';

@Component({
  selector: 'app-prediction-table',
  templateUrl: './prediction-table.component.html',
  styleUrls: ['./prediction-table.component.css']
})
export class PredictionTableComponent implements OnInit {
  @Input() grammarInput: string;
  public grammar: Grammar;
  public preditiveTable: PreditiveTable;
  public tableHead: Array<string>;
  public tableRow: Array<Array<string>>;

  constructor() {
    this.tableHead = [];
    this.tableRow = [];
    
   }

  ngOnInit() {
  }

  buildTable(){
    this.grammar = new Grammar(this.grammarInput);
    this.preditiveTable = new PreditiveTable();
    
    this.preditiveTable.mockData();

    this.tableHead = ['id', '+', '*', '(', ')', '$'];
    this.tableRow = [];        

    this.preditiveTable.table.forEach( (value, key) => {
      let tableLine = [];
      tableLine.push(key);
      for (let col=0; col<this.tableHead.length; col++){
        if ( value.get(this.tableHead[col]) ) {
          tableLine.push(value.get(this.tableHead[col]));
        }
        else {
          tableLine.push("");
        }
      }
      this.tableRow.push(tableLine);
    })
    
  }

}
