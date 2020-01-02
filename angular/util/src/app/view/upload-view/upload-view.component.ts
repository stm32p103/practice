import { Component, OnInit, Input } from '@angular/core';
import { from } from 'rxjs';
import { takeUntil, flatMap, tap } from 'rxjs/operators';
import { readAsText } from './file-loader';

interface Pointout<T> {
  id: number;
  line: number;
  column?: number;
  type?: number;
  body: T;
}

interface Opinion<T> {
  pointoutId: number; 
  type?: number;
  body: T;
}
// インフラ部分ではタイプはただの数字として扱う
// 警告は要処置とか通知するといったビジネスロジックは別扱い

@Component({
  selector: 'app-upload-view',
  templateUrl: './upload-view.component.html',
  styleUrls: ['./upload-view.component.scss']
})
export class UploadViewComponent implements OnInit {
  @Input() src: string = '';
  constructor() { }

  ngOnInit() {}

  select( evt: any ) {
    from( evt.files ).pipe( readAsText() ).subscribe( ( str ) => this.src  =str );
  }
}
