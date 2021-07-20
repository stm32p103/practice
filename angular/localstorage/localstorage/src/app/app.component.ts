import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Subject, interval, Subscription } from 'rxjs';
import { debounce, tap } from 'rxjs/operators'; 
import {  ViewChild, ElementRef } from '@angular/core';

import jsQR from 'jsqr';
import { decode } from 'jpeg-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'localstorage';
  meterValue: number = 0;
  meterSubject: Subject<number> = new Subject();

  async onFileSelected( event: Event ) {
    const file = ( <HTMLInputElement>event.target )?.files;
    
    if ( file ) {
      this.fileName = file[0].name;
      const buf = await file[0].arrayBuffer();
      const img = decode( buf );

      console.log( img.height );
      console.log( img.width );
    }
  }

  fileName = '';
}

