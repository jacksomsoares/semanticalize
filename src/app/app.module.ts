import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GrammarComponent } from './grammar/grammar.component';
import { LanguageComponent } from './language/language.component';
import { RecognitionTableComponent } from './recognition-table/recognition-table.component';
import { PredictionTableComponent } from './prediction-table/prediction-table.component';
import { FirstComponent } from './first/first.component';
import { FollowComponent } from './follow/follow.component';
import { AnalisePrecedenciaOperadoresComponent } from './analise-precedencia-operadores/analise-precedencia-operadores.component';
import { APOPasso1Component } from './apopasso1/apopasso1.component';
import { APOPasso2Component } from './apopasso2/apopasso2.component';
import { APOPasso3Component } from './apopasso3/apopasso3.component';
import { APOPasso4Component } from './apopasso4/apopasso4.component';
import { APOPasso5Component } from './apopasso5/apopasso5.component';
import { APOPasso6Component } from './apopasso6/apopasso6.component';

import { AppRoutingModule } from './app-routing/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    GrammarComponent,
    LanguageComponent,
    RecognitionTableComponent,
    PredictionTableComponent,
    FirstComponent,
    FollowComponent,
    AnalisePrecedenciaOperadoresComponent,
    APOPasso1Component,
    APOPasso2Component,
    APOPasso3Component,
    APOPasso4Component,
    APOPasso5Component,
    APOPasso6Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
