import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { takeUntil, flatMap, tap } from 'rxjs/operators';
import { readAsText } from './file-loader';

@Component({
  selector: 'app-upload-view',
  templateUrl: './upload-view.component.html',
  styleUrls: ['./upload-view.component.scss']
})
export class UploadViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  select( evt: any ) {
    from( evt.files ).pipe( readAsText( { onStart: () => console.log( 'started' ) } ) ).subscribe( ( evt: any ) => console.log( evt ) );
  }
}
