import { Block } from '../block';
import { RecordType } from './type';
import { Const } from './const';
import { getAddressSize } from './address';

/* ############################################################################
 * イマイチな判定
 * ######################################################################### */
const MAX_16BIT = Math.pow( 2, 16 ) - 1;
const MAX_24BIT = Math.pow( 2, 24 ) - 1;
const MAX_32BIT = Math.pow( 2, 32 ) - 1;

const checkAddressRange = ( min: number, max: number, val: number ) => {
  if( val < min && val > max ) {
    throw new Error( `Address(${val}) must be [ ${min}, ${max}].` );
  }
}

const check16BitAddress = ( val: number ) => checkAddressRange( 0, MAX_16BIT, val );
const check24BitAddress = ( val: number ) => checkAddressRange( 0, MAX_24BIT, val );
const check32BitAddress = ( val: number ) => checkAddressRange( 0, MAX_32BIT, val );

/* ############################################################################
 * S0-S9のレコードを1つ出力する
 * ######################################################################### */
export class SingleWriter {
  private index;
  private sum;
  private buf: string[];
  private writeRecord( type: RecordType, address: number, data?: Uint8Array ) {
    // init
    this.sum = 0;
    this.index = 0;
    this.buf = [ 'S' + type ];
    
    // calc addressSize, bytecount
    const addressSize = getAddressSize( type );
    const dataLength = data ? data.length : 0;
    const byteCount = addressSize + dataLength + Const.CHECKSUM_SIZE;
    
    // Bytecount --------------------------------------------------------------
    // check bytecount
    if( byteCount != ( byteCount & Const.BYTE_MASK ) ) {
      throw new Error( `Byte count(${byteCount}) overflowed.` );
    }
    
    // add bytecount
    this.writeByte( byteCount );
    
    // Address ----------------------------------------------------------------
    // check
    let shift = Const.BYTE_SHIFT * addressSize;
    
    // add address
    for( let i=0; i<addressSize; i++ ) {
      shift -= Const.BYTE_SHIFT;
      this.writeByte( address >> shift );
    }
    
    // Data -------------------------------------------------------------------
    // add data
    if( data ) {
      data.forEach( byte => this.writeByte( byte ) );
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
    check16BitAddress( block.address );
    return this.writeRecord( '1', block.address, block.buffer );
  }
  writeData24( block: Block ) {
    check24BitAddress( block.address );
    return this.writeRecord( '2', block.address, block.buffer );
  }
  writeData32( block: Block ) {
    check32BitAddress( block.address );
    return this.writeRecord( '3', block.address, block.buffer );
  }
  writeCount16( count: number ) {
    check16BitAddress( count );
    return this.writeRecord( '5', count );
  }
  writeCount24( count: number ) {
    check24BitAddress( count );
    return this.writeRecord( '6', count );
  }
  writeStartAddress32( address: number ) {
    check32BitAddress( address );
    return this.writeRecord( '7', address );
  }
  writeStartAddress24( address: number ) {
    check24BitAddress( address );
    return this.writeRecord( '8', address );
  }
  writeStartAddress16( address: number ) {
    check16BitAddress( address );
    return this.writeRecord( '9', address );
  }
}
