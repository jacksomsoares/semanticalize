import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { GrammarComponent } from '../grammar/grammar.component';
import { AnalisePrecedenciaOperadoresComponent } from '../analise-precedencia-operadores/analise-precedencia-operadores.component';

const routes: Routes = [
  { path: 'analise-preditiva', component: GrammarComponent },
  { path: 'precedencia-operadores', component: AnalisePrecedenciaOperadoresComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
