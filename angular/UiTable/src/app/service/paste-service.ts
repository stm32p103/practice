import { Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Observable, Subject, from } from 'rxjs';
import { flatMap, map, filter } from 'rxjs/operators';

@Injectable()
export class PasteService {
  private messageSubject = new Subject<ClipboardEvent>();

  constructor(private eventManager: EventManager) {
    // Windowに対するペーストイベントをSubjectにする
    this.eventManager.addGlobalEventListener('window', 'paste', async (event:ClipboardEvent) => this.messageSubject.next(event) );
  }

  private get event(): Observable<ClipboardEvent> {
    return this.messageSubject;
  }

  // MIMEタイプを指定してデータを取得する
  getData(mimeType: string): Observable<string> {
    return this.messageSubject.pipe( 
      map( e => e.clipboardData.getData(mimeType) ),
      filter( data => data.length > 0 )
    );
  }

  private getFiles() {
    return this.messageSubject.pipe( flatMap( e => {
      const files = e.clipboardData.files;
      const array: File[] = [];

      // 一旦配列にする
      for( let i = 0; i < files.length; i++ ) {array
        array.push( (files[i]) );
      }

      return from( array );
    } ) );
  }

  getImages() {
    // MIME TypeがImageから始まっていたら画像として扱う
    // https://developer.mozilla.org/ja/docs/Web/HTTP/Basics_of_HTTP/MIME_types
    return this.getFiles().pipe( 
      filter( file => file.type.match('^image/').length > 0 ),
      flatMap( file => from( createImageBitmap(file) ) )
    );
  }
}
