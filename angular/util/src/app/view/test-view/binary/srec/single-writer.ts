import { Block } from '../block';
import { RecordType } from './type';
import { Const } from './const';
import { getAddressSize } from './address';

/* ############################################################################
 * S0-S9のレコードを1つ出力する
 * ######################################################################### */
export class SingleWriter {
  private index;
  private sum;
  private buf: string[];
  private writeRecord( type: RecordType, address: number, data?: Uint8Array ) {
    // init
    this.buf = [ 'S' + type ];
    this.sum = 0;
    this.index = 0;
    
    const addressSize = getAddressSize( type );
    
    // add bytecount
    const dataLength = data ? data.length : 0;
    const byteCount = addressSize + dataLength + Const.CHECKSUM_SIZE;
    this.writeByte( byteCount );
    
    // add address
    let shift = Const.BYTE_SHIFT * addressSize;
    for( let i=0; i<addressSize; i++ ) {
      shift -= Const.BYTE_SHIFT;
      this.writeByte( address >> shift );
    }
    
    // add data
    if( data ) {
      for( let i=0; i<data.length; i++ ) {
        this.writeByte( data[ i ] );
      }
    }
    
    // add checksum
    this.writeByte( Const.BYTE_MASK - ( this.sum & Const.BYTE_MASK ) );
    
    // merge
    const res = this.buf.join('').toUpperCase();
    
    delete this.buf;
    return res;
  }
  
  private writeByte( num: number ) {
    num = num & Const.BYTE_MASK;
    this.sum = this.sum + num;
    this.index++;
    this.buf.push( '00'.concat( num.toString( Const.RADIX ) ).slice( -Const.BYTE_LEN ) );
  }
  
  writeHeader( header: string ): string {
    const array = new TextEncoder().encode( header );
    return this.writeRecord( '0', 0, array );
  }
  writeData16( block: Block ) {
    return this.writeRecord( '1', block.address, block.buffer );
  }
  writeData24( block: Block ) {
    return this.writeRecord( '2', block.address, block.buffer );
  }
  writeData32( block: Block ) {
    return this.writeRecord( '3', block.address, block.buffer );
  }
  writeCount16( count: number ) {
    return this.writeRecord( '5', count );
  }
  writeCount24( count: number ) {
    return this.writeRecord( '6', count );
  }
  writeStartAddress32( address: number ) {
    return this.writeRecord( '7', address );
  }
  writeStartAddress24( address: number ) {
    return this.writeRecord( '8', address );
  }
  writeStartAddress16( address: number ) {
    return this.writeRecord( '9', address );
  }
}
