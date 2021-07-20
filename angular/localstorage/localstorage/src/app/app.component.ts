import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { JpgLoader, QrReader } from './loader';


interface RowData {
  filename: string;
  code: string | null;
  url: string | null;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  // title = 'localstorage';
  // meterValue: number = 0;
  // meterSubject: Subject<number> = new Subject();
  private readonly loader: JpgLoader = new JpgLoader();
  private readonly reader: QrReader = new QrReader();
  rows: RowData[] = [];
  displayedColumns: string[] = ['filename', 'code', 'image'];

  async onFileSelected( event: Event ) {
    const files = ( <HTMLInputElement>event.target )?.files;
    
    if ( !files ) {
      return;
    }

    const rows: RowData[] = [];
    for( let i = 0; i < files.length; i++ ) {
      const filename = files[i].name;
      const img = await this.loader.load( await files[i].arrayBuffer() );
      const code = await this.reader.read( img );
      const url = URL.createObjectURL( files[i] );  // revokeObjectURLで消すこと

      const row: RowData = {
        filename: filename,
        code: code,
        url: url
      }

      rows.push( row );
    }

    this.rows = rows;
  }
}
