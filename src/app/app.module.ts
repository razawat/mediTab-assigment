import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchByComponent } from './Components/search-by/search-by.component';
import { SearchComponent } from './Components/search/search.component';
import { ResultsComponent } from './Components/results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchByComponent,
    SearchComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
