import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

//-----------------------------------------------------------------------------
const ANGULAR_MODULES = [
    BrowserAnimationsModule,
    BrowserModule
];
//-----------------------------------------------------------------------------
import { FieldsetModule } from 'primeng/fieldset';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
const PRIMENG_MODULES = [
    FieldsetModule,
    CheckboxModule,
    FormsModule,
    TableModule,
    HttpClientModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    RadioButtonModule,
    MessagesModule,
    MessageModule
];
//-----------------------------------------------------------------------------
import { StoreModule } from '@ngrx/store';
//import { counterReducer, CounterActions, CounterStore } from './nx-counter';
import { counterReducer } from './nx-counter';
//-----------------------------------------------------------------------------

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...ANGULAR_MODULES,
    ...PRIMENG_MODULES,
    StoreModule.forRoot( { count: counterReducer } )
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

