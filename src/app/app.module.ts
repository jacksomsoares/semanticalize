import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GrammarComponent } from './grammar/grammar.component';
import { LanguageComponent } from './language/language.component';
import { RecognitionTableComponent } from './recognition-table/recognition-table.component';
import { PredictionTableComponent } from './prediction-table/prediction-table.component';

@NgModule({
  declarations: [
    AppComponent,
    GrammarComponent,
    LanguageComponent,
    RecognitionTableComponent,
    PredictionTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
