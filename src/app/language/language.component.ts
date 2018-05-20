import { Component, OnInit, Input } from '@angular/core';

import { Grammar } from '../Classes/Grammar';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  @Input() grammar: string;  
  language: string;
  samples: string;
  precision: number = 2;

  constructor() { }

  ngOnInit() {
  }

  generate(): void{
    let grammar = new Grammar(this.grammar);
    let holdSentences = grammar.gerarSentencas(this.precision);
    let holdMinSentence = grammar.IdentificaSentencaMinima(holdSentences);
    let holdLang = grammar.gerarLinguagem(holdSentences);

    let buildLang = "Senteça minima: " + holdMinSentence + "\n";
    buildLang = buildLang + holdLang;
    
    this.language = buildLang;
    this.samples = holdSentences.toString();
    
    
    
        
  }

}
