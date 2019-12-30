import { Component, OnInit, Input } from '@angular/core';
import { SRecordReader, SRecordWriter, Block } from './srec';

const array = new ArrayBuffer( 10 );

const bin1 = new Uint8Array( array, 0, 5);
const bin2 = new Uint8Array( array, 5, 5);
    bin1[0] = 0;
    bin1[1] = 0xFF;
    bin1[2] = 0xAA;
    bin1[3] = 0x55;
    bin2[0] = 0;
    bin2[1] = 0x1;
    bin2[2] = 0x2;
    bin2[3] = 0x33;


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
  styles: [ '.active { border: 1px solid #000 }', 'span { user-select: all }' ]
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
  template: '<hex-byte *ngFor="let byte of data" [value]="byte"></hex-byte>'
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
  srec: Block[] = [];
  constructor() {
    const reader = new SRecordReader();
    const writer = new SRecordWriter();
    try {
      this.srec.push( reader.fromRecord( 'S31508000000001800203D030008010300080B03000840' ) );
      this.srec.push( reader.fromRecord( 'S3150800001000000000000000000000000000000000D2' ) );
      this.srec.push( reader.fromRecord( 'S3150800002000000000000000000000000011030008A6' ) );
      this.srec.push( reader.fromRecord( 'S3150800003000000000000000001B030008250300085C' ) );
      this.srec.push( reader.fromRecord( 'S31508000040BD030008BD030008BD030008BD03000882' ) );
      this.srec.push( reader.fromRecord( 'S31508000050BD030008BD030008BD030008BD03000872' ) );
      
      console.log( writer.toHeader('hello') );
      console.log( writer.toData32( reader.fromRecord( 'S31508000050BD030008BD030008BD030008BD03000872' ) ) );
      console.log( writer.toStartAddress32( reader.fromRecord( 'S7050800033DB2' ).address ) );
      
      }catch( err ){
        console.log(err)
      }
  }
  binary = new Uint8Array( array );
  ngOnInit() {
    console.log( this.srec );
    console.log( bin1 );
    console.log( bin2 );
    console.log( new Uint8Array(array ));
  }

}
