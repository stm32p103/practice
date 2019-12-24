import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { ViewModule } from './view/view.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// ############################################################################
import { PanelMenuModule } from 'primeng/panelmenu';
// ############################################################################

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // ------------------------------------------------------------------------
    PanelMenuModule,
    // ------------------------------------------------------------------------
    ViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
