import { Block, RecordType, Record } from './type';
import { Const } from './const';
import { getAddressSize } from './address';

export class Writer {
  private index;
  private sum;
  private buf: string[];
  private toSRecord( type: RecordType, address: number, data?: Uint8Array ) {
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
  
  toHeader( header: string ): string {
    const array = new TextEncoder().encode( header );
    return this.toSRecord( '0', 0, array );
  }
  toData16( block: Block ) {
    return this.toSRecord( '1', block.address, block.buffer );
  }
  toData24( block: Block ) {
    return this.toSRecord( '2', block.address, block.buffer );
  }
  toData32( block: Block ) {
    return this.toSRecord( '3', block.address, block.buffer );
  }
  toCount16( count: number ) {
    return this.toSRecord( '5', count );
  }
  toCount24( count: number ) {
    return this.toSRecord( '6', count );
  }
  toStartAddress32( address: number ) {
    return this.toSRecord( '7', address );
  }
  toStartAddress24( address: number ) {
    return this.toSRecord( '8', address );
  }
  toStartAddress16( address: number ) {
    return this.toSRecord( '9', address );
  }
}
