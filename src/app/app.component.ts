import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Trabalho de Analise Semantica';

  checkIfHomePage(): boolean {
    if (window.location.pathname === "/" || window.location.pathname.toLowerCase() === "/semanticalize/") {
      return true;
    }
    return false;
  }
}
