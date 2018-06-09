import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recognition-table',
  templateUrl: './recognition-table.component.html',
  styleUrls: ['./recognition-table.component.css']
})
export class RecognitionTableComponent implements OnInit {
  inputRecog: string;

  constructor() { }

  ngOnInit() {
  }

  reconize(): void {
    console.log(this.inputRecog);
  }

}
