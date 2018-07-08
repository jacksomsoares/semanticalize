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
  constructor() { }

  doStepTwo(){

    let grammar = new GrammarV2(this.grammar);
    let stepTwo = new MenorPrecedencia();
    let stepOne = new OperatorPrecedenceParser();

    stepOne.FirstStep(grammar);

    stepTwo.findTNT(grammar);
    this.tableHeader = stepTwo.listaTNT;

    let maior: number = 0;

    for(let x = 0; x < this.tableHeader.length; x++){
      
      let a = stepOne.leading.get(this.tableHeader[x].toString().split("")[1]).toString().split(",");

      if(a.length > maior){
        maior = a.length;
      }

    }

    for(let x = 0; x < this.tableHeader.length; x++){

      let precedencia = this.tableHeader[x].toString().split("");
      
      let letra = stepOne.leading.get(precedencia[1]).toString().split(",");

      for(let j = 0; j < letra.length; j++){
        // let precedencias = letra[j].toString().split("");
        console.log(letra[j]);
      }

      //Mostrar a tabela deitada

    }

    


    
  }

  public getMaior(){

    
    
}

  ngOnInit() {
  }

}


