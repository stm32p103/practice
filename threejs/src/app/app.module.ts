import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VisualModule } from '../visuals/visual.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    VisualModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
