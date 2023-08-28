import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Importieren Sie HttpClientModule
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Fügen Sie HttpClientModule hier hinzu
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }