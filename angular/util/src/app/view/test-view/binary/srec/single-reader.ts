import { Block } from '../block';
import { RecordType, SingleRecord } from './type';
import { Const } from './const';
import { getAddressSize } from './address';

/* ############################################################################
 * SRecord 1行を読み込み1つのブロック(SingleRecord)に変換する
 * ######################################################################### */
export class SingleReader {
  // variable
  private index;
  private sum;
  private record;

  private readByte(): number {
    const value = parseInt( this.record.substr( this.index, Const.BYTE_LEN ), Const.RADIX );
    this.index += Const.BYTE_LEN;
    this.sum += value;
    
    return value; 
  }
  
  private remain(): number {
    return ( this.record.length - this.index ) / Const.BYTE_LEN;
  }
  
  read( record: string ): SingleRecord {
    this.record = record;
    this.index = Const.BYTECOUNT_POS;
    this.sum = 0;
    // check format
    if( !Const.FORMAT.test( record ) ) {
      throw new Error( 'Invalid format.' );
    }
    
    // check record type
    const recordType = record[ Const.TYPE_POS ] as RecordType;
    const addressSize = getAddressSize( recordType );
    
    // check byte count
    const byteCount = this.readByte();
    if( byteCount !== this.remain() ) {
      throw new Error( 'Bytecount mismatch.' );
    }
    
    // calc address
    // ビットシフトは32ビット符号付整数として扱われるため、負の数になる可能性がある。
    let address = 0;
    for( let i=0; i<addressSize; i++ ) {
      address = ( address * 256 ) + this.readByte();
    }
    
    // allocate buffer
    const size = this.remain() - Const.CHECKSUM_SIZE;
    const buffer = new Uint8Array( new ArrayBuffer( size ) );
      
    // store value
    for( let i=0; i<size; i++ ) {
      buffer[i] = this.readByte();
    }
    
    // compare checksum
    const checksum = this.readByte();
    if( ( this.sum & Const.BYTE_MASK ) !== Const.CHECKSUM_VALUE ) {
      throw new Error( 'Checksum error.' );
    }
    
    return { type: recordType, address: address, buffer: buffer };
  }
}


