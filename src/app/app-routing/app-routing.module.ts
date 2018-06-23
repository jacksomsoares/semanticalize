import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { GrammarComponent } from '../grammar/grammar.component';

const routes: Routes = [  
  {path: 'analise-preditiva', component: GrammarComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
