import { Component, OnInit, Input } from '@angular/core';
import { Follow } from '../Classes/Follow';
import { Grammar } from '../Classes/Grammar';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {

  @Input() grammar: string;
  grammarGerada: Grammar; 
  followText: string;
  follow: Follow;

  constructor() { }

  ngOnInit() {
  }

  doFirst(){

    this.grammarGerada = new Grammar(this.grammar);
    this.follow = new Follow(this.grammarGerada);

    this.followText = this.follow.exibirFollows();

  }

}
