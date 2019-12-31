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

  private readBytes( count: number = 1 ): number {
    let tmp = 0;
    let value = 0;
    let sum = this.sum;
    let index = this.index;
    for( let i=0; i<count; i++ ) {
      if( index >= this.record.length ) {
        throw new Error( 'Out of range.' );
      }
      
      tmp = parseInt( this.record.substr( index, Const.BYTE_LEN ), Const.RADIX );
      value = ( value << Const.BYTE_SHIFT ) + tmp;
      sum = sum + tmp;
      index = index + Const.BYTE_LEN;
    }
    
    this.index = index;
    this.sum = sum;
    
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
    const byteCount = this.readBytes();
    if( byteCount !== this.remain() ) {
      throw new Error( 'Bytecount mismatch.' );
    }
    
    // calc address
    const address = this.readBytes( addressSize );
    
    // allocate buffer
    const size = this.remain() - Const.CHECKSUM_SIZE;
    const buffer = new Uint8Array( new ArrayBuffer( size ) );
      
    // store value
    for( let i=0; i<size; i++ ) {
      buffer[i] = this.readBytes();
    }
    
    // compare checksum
    const checksum = this.readBytes();
    if( ( this.sum & Const.BYTE_MASK ) !== Const.CHECKSUM_VALUE ) {
      throw new Error( 'Checksum error.' );
    }
    
    return { type: recordType, address: address, buffer: buffer };
  }
}


