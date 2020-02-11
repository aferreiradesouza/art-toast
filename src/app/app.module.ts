import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArtToastModule } from 'projects/art-toast/src/public-api';

const configTheme = {
  danger: {
    backgroundColor: '#DC3545',
    color: '#fff'
  },
  success: {
    backgroundColor: '#00D68F',
    color: '#fff'
  },
  warning: {
    backgroundColor: '#F0AD4E',
    color: '#fff'
  },
  info: {
    backgroundColor: '#5BC0DE',
    color: '#fff'
  },
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    ArtToastModule.forRoot(configTheme)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
