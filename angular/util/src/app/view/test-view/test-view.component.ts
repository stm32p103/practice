import { Component, OnInit, Input } from '@angular/core';
import { str2srec, srec2str } from './binary';
import { from } from 'rxjs';
import { map, flatMap, tap } from 'rxjs/operators';

const input = from( `S00D000053616D706C652E6D6F7412
S31508000000001800203D030008010300080B03000840
S3150800001000000000000000000000000000000000D2
S3150800002000000000000000000000000011030008A6
S3150800003000000000000000001B030008250300085C
S7050800033DB2`.split('\n'));


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dec2hex' })
export class Dex2HexPipe implements PipeTransform {
  transform( value: number ) {
    return ('00' + value.toString( 16 ).toUpperCase() ).substr(-2);
  }
}


@Component({
  selector: 'hex-byte',
  template: '<span (click)="clicked()" [ngClass]="active ? \'active\' : \'non\'">{{value | dec2hex}}</span>',
  styles: [ 'span { user-select: all; font-family: monospace; margin: 1px 3px; }' ]
})
export class HexByteComponent {
  @Input() value: number;
  
  active: boolean = true;
  constructor() {}
  
  clicked() {
    this.active = !this.active;
  }
}


@Component({
  selector: 'hex-view',
  template: '<hex-byte *ngFor="let byte of data" [value]="byte"></hex-byte>',
  styles: [ 'hex-byte:nth-child(16n):after { content:  "\\A" }', 'hex-byte { white-space:pre }' ]
})
export class HexViewComponent {
  @Input() data: Uint8Array;
  constructor() {
  }
}

@Component({
  selector: 'app-test-view',
  templateUrl: './test-view.component.html',
  styleUrls: ['./test-view.component.scss']
})
export class TestViewComponent implements OnInit {
  binary: Uint8Array;
  constructor() {}
  ngOnInit() {
    input.pipe(
      str2srec(),
      tap( rec => {
        this.binary = rec.blocks[0].buffer;
        console.log( rec );
      } ),
      srec2str( { outputCount: true, outputStartAddress: true, outputHeader: true, maxData: 16 } ),
    ).subscribe( rec => {
      console.log( rec );
    } );
  }
}
