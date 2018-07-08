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
  public tableHeader: string[];
  public tableHeaderP3: string[];
  public tableRow: string[];
  public tableRowP3: string[];
  constructor() { }

  doStepTwo(){

    let grammar = new GrammarV2(this.grammar);
    let stepTwo = new MenorPrecedencia();
    let stepOne = new OperatorPrecedenceParser();

    stepOne.FirstStep(grammar);

    stepTwo.findTNT(grammar);
    this.tableHeader = stepTwo.listaTNT;
    this.tableRow = [];

    let maior: number = 0;

    for(let x = 0; x < this.tableHeader.length; x++){
      
      let a = stepOne.leading.get(this.tableHeader[x].toString().split("")[1]).toString().split(",");

      if(a.length > maior){
        maior = a.length;
      }

    }

    for(let x = 0; x < this.tableHeader.length; x++){

      let precedencia = this.tableHeader[x].toString().split("");
      
      let letra = stepOne.leading.get(precedencia[1]).toString();
      
      let stringLinha = this.tableHeader[x].toString() + " -> " + precedencia[0].toString() + "<" + letra.replace(/,/g,", "+precedencia[0].toString() + "<") 
      console.log(stringLinha);
      this.tableRow.push(stringLinha);

      for(let j = 0; j < letra.length; j++){
        
        // let precedencias = letra[j].toString().split("");  
        // console.log(letra[j]);
      }

      //Mostrar a tabela deitada

    }
    
  }

  doStepTree(){
    let grammar = new GrammarV2(this.grammar);
    let stepTree = new MaiorPrecedencia();
    let stepOne = new OperatorPrecedenceParser();

    stepOne.FirstStep(grammar);

    stepTree.findNTT(grammar);
    this.tableHeaderP3 = stepTree.listaNTT;
    this.tableRowP3 = [];

    let maior: number = 0;

    for(let x = 0; x < this.tableHeaderP3.length; x++){
      
      let a = stepOne.trailing.get(this.tableHeaderP3[x].toString().split("")[0]).toString().split(",");

      if(a.length > maior){
        maior = a.length;
      }

    }

    for(let x = 0; x < this.tableHeaderP3.length; x++){

      let precedencia = this.tableHeaderP3[x].toString().split("");
      
      let letra = stepOne.leading.get(precedencia[0]).toString();
      
      let stringLinha = this.tableHeaderP3[x].toString() + " -> " + precedencia[1].toString() + "<" + letra.replace(/,/g,", "+precedencia[1].toString() + "<") 
      console.log(stringLinha);
      this.tableRowP3.push(stringLinha);

      for(let j = 0; j < letra.length; j++){
        
        // let precedencias = letra[j].toString().split("");  
        // console.log(letra[j]);
      }

      //Mostrar a tabela deitada

    }
    
  }

  ngOnInit() {
  }

}


