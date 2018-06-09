import { Component, OnInit, Input } from '@angular/core';
import { Grammar } from '../Classes/Grammar';
import { First } from '../Classes/First';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {

  @Input() grammar: string; 
  grammarGerada: Grammar;
  firstText: string;
  first: First;

  constructor() {}

  ngOnInit() {
    
  }

  doFirst(){
    this.grammarGerada = new Grammar(this.grammar);
    this.first = new First(this.grammarGerada);

    this.firstText = this.first.exibirFirsts();

  }

}
