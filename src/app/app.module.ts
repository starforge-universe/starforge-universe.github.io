import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './components/app.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    AppComponent,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
