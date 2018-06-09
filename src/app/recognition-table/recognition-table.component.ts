import { Component, OnInit } from '@angular/core';
import {PreditiveTable} from '../Classes/PreditiveTable'

@Component({
  selector: 'app-recognition-table',
  templateUrl: './recognition-table.component.html',
  styleUrls: ['./recognition-table.component.css']
})
export class RecognitionTableComponent implements OnInit {
  inputRecog: string;

  private preditiveTable = new PreditiveTable();  

  constructor() {    
    let tempMap = new Map<string, string>();
    tempMap.set('id', "TE'");
    tempMap.set('(', "TE'");
    this.preditiveTable.table.set('E', tempMap);
    
    tempMap = new Map<string, string>();
    tempMap.set('+', "+TE'");
    tempMap.set(')', "&");
    tempMap.set('$', "&");

    this.preditiveTable.table.set("E'", tempMap);

    let tempArray = [];
   }

  ngOnInit() {
  }

  reconize(): void {
    console.log(this.inputRecog);
    console.log(this.preditiveTable);
    console.log(this.preditiveTable.table.get('E').get('id'));
  }

}
