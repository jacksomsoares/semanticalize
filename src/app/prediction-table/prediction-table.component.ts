import { Component, OnInit, Input } from '@angular/core';
import {Grammar} from '../Classes/Grammar';
import {PreditiveTable} from '../Classes/PreditiveTable';
import { First } from '../Classes/First';

@Component({
  selector: 'app-prediction-table',
  templateUrl: './prediction-table.component.html',
  styleUrls: ['./prediction-table.component.css']
})
export class PredictionTableComponent implements OnInit {
  @Input() grammarInput: string;
  public grammar: Grammar;
  public first: First;
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
    //this.first = new First(this.grammar);
    
    //this.preditiveTable.mockData();
    this.preditiveTable.generate(this.grammar);

    this.grammar.terminais.forEach(element => {
      this.tableHead.push(element);
    });
    this.tableHead.push("$");
    //this.tableHead = ['id', '+', '*', '(', ')', '$'];
    this.tableRow = [];        

    this.preditiveTable.table.forEach( (value, key) => {
      let tableLine = [];
      tableLine.push(key); //add NT para exibir na linha da tabela
      for (let col=0; col<this.tableHead.length; col++){
        if ( value.get(this.tableHead[col]) ) { // verifica se existe uma key do value conforme o parametro
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
