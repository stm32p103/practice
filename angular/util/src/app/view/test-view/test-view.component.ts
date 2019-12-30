import { Component, OnInit, Input } from '@angular/core';
import { str2srec } from './srec';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

const input1 = from( `S00D000053616D706C652E6D6F7412
S31508000000001800203D030008010300080B03000840
S3150800001000000000000000000000000000000000D2
S3150800002000000000000000000000000011030008A6
S31108001010F8B5C046F8BC08BC9E46704700
S3150800101C02030405060708090A0B0C0D0E0F10101F
S3150800102C0102030405060708090A0B0C0D0E0F101E
S3150800103C000000000000000001020304060708096E
S3090800104CE9000008A1
S30908001050C1000008C5
S3110800105400127A000400000001000000F1
S7050800033DB2`.split('\n'));

const input2 = from( `S00D000053616D706C652E6D6F7412
S31508000000001800203D030008010300080B03000840
S3150800102C0102030405060708090A0B0C0D0E0F101E
S3150800103C000000000000000001020304060708096E
S3090800104CE9000008A1
S30908001050C1000008C5
S3150800001000000000000000000000000000000000D2
S3150800002000000000000000000000000011030008A6
S31108001010F8B5C046F8BC08BC9E46704700
S3150800101C02030405060708090A0B0C0D0E0F10101F
S3110800105400127A000400000001000000F1
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
  constructor() {}
  ngOnInit() {
    input1.pipe( str2srec() ).subscribe( res => console.log( res ));
    input2.pipe( str2srec() ).subscribe( res => console.log( res ));
  }
}
