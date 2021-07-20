import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table'; 
const materialModules = [
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatTableModule
];

import { AppComponent } from './app.component';
import { SafeUrlPipe } from './pipe/safe-url-pipe';

@NgModule({
  declarations: [
    AppComponent,
    SafeUrlPipe
  ],
  imports: [
    BrowserModule,
    ...materialModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}




// interface LogEntryProperties {
//   locationId: string;
//   itemId: string;
// } 


// // 
// export class LogEntry {
//   static create( locationId: string, itemId: string ) {
//     return new LogEntry( locationId, itemId ) {}
//   }

//   static clone( src: LogEntry ) {
//     return new LogEntry( src.locationId, src.itemId ) {}
//   }

//   private constructor( 
//     public readonly locationId: string,
//     public readonly itemId: string  
//   ) {}
// }

// class Logger {
//   private currentLocationId: string | null = null;
//   setLocation( id: string ) {
//     this.currentLocationId = id;
//   }
// }