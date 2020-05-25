import { Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Observable, Subject, from } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { async } from '@angular/core/testing';

@Injectable()
export class PasteService {
  private messageSubject = new Subject<ClipboardEvent>();

  constructor(private eventManager: EventManager) {
    this.eventManager.addGlobalEventListener('window', 'paste', async (event:ClipboardEvent) => {
      this.messageSubject.next(event);
      console.log( event.clipboardData.types);
    } );
  }

  get event(): Observable<ClipboardEvent> {
    return this.messageSubject;
  }

  getData(mimeType: string): Observable<string> {
    return this.messageSubject.pipe( map( e => e.clipboardData.getData(mimeType) ) );
  }

  getImage() {
    return this.messageSubject.pipe( flatMap( e => {
      if( e.clipboardData.types[0] == 'Files' ) {
        let file = e.clipboardData.files[0];
        let imageObservable = from( createImageBitmap(file) );

        return imageObservable;
      }
    } ) );
  }
}
