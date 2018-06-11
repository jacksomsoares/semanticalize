import { Component, OnInit, OnChanges } from '@angular/core';

import { Grammar } from '../Classes/Grammar';

@Component({
  selector: 'app-grammar',
  templateUrl: './grammar.component.html',
  styleUrls: ['./grammar.component.css']
})
export class GrammarComponent implements OnInit {
  grammar: Grammar;
  textArea: string = 
  `G = ({ E, D, T, G, F}, { i, +, *, (, ) }, P, E ) 
  P=
  E -> TD
  D -> +TD|&
  T -> FG
  G -> *FG|&
  F -> (E)|i`;

  constructor() {
    //console.log('log constructor');
  }

  ngOnInit() {
    //console.log('log ng on init');
  }

  reconhecer(): void {
    console.log(this.textArea);
  }
  
  gerarSent(): void {

  }

  //Logs de teste para ver como funciona
  /*
  ngOnChanges() {
    console.log('log ng on changes');
  }

  ngDoCheck(){
    console.log('log ng do Check');
  }

  ngAfterContentInit(){
    console.log('log ng after content init');
  }

  ngAfterContentChecked(){
    console.log('log ng after content checked');
  }

  ngAfterViewInit(){
    console.log('log ng after view init');
  }

  ngAfterViewChecked(){
    console.log('log ng after view checked');
  }

  ngOnDestroy(){
    console.log('log ng on destroy');
  }
  */

}
