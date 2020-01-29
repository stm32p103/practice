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
// ハイライトは崩れる可能性がある

@Component({
  selector: 'app-upload-view',
  templateUrl: './upload-view.component.html',
  styleUrls: ['./upload-view.component.scss']
})
export class UploadViewComponent implements OnInit {
  src: string[] = [];
  lineNumber = true;
  constructor() { }

  ngOnInit() {}

  select( evt: any ) {
    from( evt.files ).pipe( 
      readAsText(),
      tap( str => this.src = str.split('\n') )
    ).subscribe( 
      () => console.log( 'Read file done.' ),
      ( err )=> console.log( err ) ,
      ()=>{console.log('end') }
    );
  }
  
  hello(){
    // get the "Div" inside which you wish to scroll (i.e. the container element)
    const myElement = document.getElementById('inner');
    const myContainer = document.getElementById('container');
    const topPos = myElement.offsetTop;
    console.log(topPos);
    console.log( myElement )
    console.log( myElement.offsetParent )
  }
    
  download() {
    const blob = new Blob( this. src, { type: "text/plain" } );
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "filename.txt");
    link.click();
  }
}
