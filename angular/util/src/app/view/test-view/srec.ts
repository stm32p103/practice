type RecordType = '0' | '1' | '2' | '3' | '5' | '6' | '7' | '8' | '9';

export interface Block {
  address: number;
  buffer: Uint8Array;
}

export interface Record extends Block {
  type: RecordType;
}

export interface OrderedBlock extends Block {
  order: number;
}

const FORMAT = /^S[0-3,5-9]([0-9,A-F]{2}){4,}$/;   // SRecordの形式(S0-3,5-9)の後HEXが4つ以上あること(最低でもバイトカウント+16bitアドレス+SUM)
const TYPE_POS = 1;                                // SRecordのレコードタイプの位置
const RADIX = 16;                                  // SRecordの数値の基数

const BYTECOUNT_POS = 2;                           // SRecordのバイトカウントの開始位置

const CHECKSUM_SIZE = 1;                           // SRecordのチェックサムのバイト数
const CHECKSUM_VALUE = 0xFF;                       // SRecordのチェックサムの期待値

const BYTE_LEN = 2;                                // Stringで1バイトを表す文字数
const BYTE_MASK = 0xFF;                            // Numberの下位1バイトを抽出するマスク
const BYTE_SHIFT = 8;                              // Numberを1バイト分シフトするビット数

const ADDRESS_LEN_16 = 2;
const ADDRESS_LEN_24 = 3;
const ADDRESS_LEN_32 = 4;

const getAddressSize = ( type: RecordType ): number => {
  let res;
  switch( type ) {
  case '0':
  case '1': 
  case '5':
  case '9':
    res = ADDRESS_LEN_16;
    break;
  case '2':
  case '8':
  case '6':
    res = ADDRESS_LEN_24;
    break;
  case '3':
  case '7':
    res = ADDRESS_LEN_32;
    break;
  default:
    throw new Error( 'Invalid record type.' );
  }
  return res;
}

export class SRecordReader {
  // variable
  private index;
  private sum;
  private record;

  private read( count: number = 1 ): number {
    let tmp = 0;
    let value = 0;
    let sum = this.sum;
    let index = this.index;
    for( let i=0; i<count; i++ ) {
      if( index >= this.record.length ) {
        throw new Error( 'Out of range.' );
      }
      
      tmp = parseInt( this.record.substr( index, BYTE_LEN ), RADIX );
      value = ( value << BYTE_SHIFT ) + tmp;
      sum = sum + tmp;
      index = index + BYTE_LEN;
    }
    
    this.index = index;
    this.sum = sum;
    
    return value; 
  }
  
  private remain(): number {
    return ( this.record.length - this.index ) / BYTE_LEN;
  }
  
  fromRecord( record: string ): Record {
    this.record = record;
    this.index = BYTECOUNT_POS;
    this.sum = 0;
    // check format
    if( !FORMAT.test( record ) ) {
      throw new Error( 'Invalid format.' );
    }
    
    // check record type
    const recordType = record[ TYPE_POS ] as RecordType;
    const addressSize = getAddressSize( recordType );
    
    // check byte count
    const byteCount = this.read();
    if( byteCount !== this.remain() ) {
      throw new Error( 'Bytecount mismatch.' );
    }
    
    // calc address
    const address = this.read( addressSize );
    
    // allocate buffer
    const size = this.remain() - CHECKSUM_SIZE;
    const buffer = new Uint8Array( new ArrayBuffer( size ) );
      
    // store value
    for( let i=0; i<size; i++ ) {
      buffer[i] = this.read();
    }
    
    // compare checksum
    const checksum = this.read();
    if( ( this.sum & BYTE_MASK ) !== CHECKSUM_VALUE ) {
      throw new Error( 'Checksum error.' );
    }
    
    return { type: recordType, address: address, buffer: buffer };
  }
}

export class SRecordWriter {
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
    const byteCount = addressSize + dataLength + CHECKSUM_SIZE;
    this.writeByte( byteCount );
    
    // add address
    let shift = BYTE_SHIFT * addressSize;
    for( let i=0; i<addressSize; i++ ) {
      shift -= BYTE_SHIFT;
      this.writeByte( address >> shift );
    }
    
    // add data
    if( data ) {
      for( let i=0; i<data.length; i++ ) {
        this.writeByte( data[ i ] );
      }
    }
    
    // add checksum
    this.writeByte( BYTE_MASK - ( this.sum & BYTE_MASK ) );
    
    // merge
    const res = this.buf.join('').toUpperCase();
    
    delete this.buf;
    return res;
  }
  
  private writeByte( num: number ) {
    num = num & BYTE_MASK;
    this.sum = this.sum + num;
    this.index++;
    this.buf.push( '00'.concat( num.toString( RADIX ) ).slice( -BYTE_LEN ) );
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

interface Section {
  blocks: OrderedBlock[];
  size: number;
  start: number;
}

export class SRecord {
  private order = 0;
  blocks: OrderedBlock[] = [];
  header?: string;
  startAddress?: number;
  recordCount?: number;
  
  append( rec: Record ) {
    switch( rec.type ) {
    case '0':
      this.header = String.fromCharCode.apply( null, rec.buffer );
      break;
    case '1':
    case '2':
    case '3':
      this.blocks.push( { address: rec.address, buffer: rec.buffer, order: this.order });
      this.order++;
      break;
    case '5':
    case '6':
      this.recordCount = rec.address;
      break;
    case '7':
    case '8':
    case '9':
      this.startAddress = rec.address;
      break;
    default:
      throw new Error( 'Invalid record type.' );
    }
  }
  
  simplify() {
    const blocks = this.blocks.slice().sort( ( a, b ) => a.address - b.address );
    let section: Section = { blocks: [ blocks[0] ], size: blocks[0].buffer.length, start: blocks[0].address };
    const group: Section[] = [ section ];
    
    blocks.reduce( ( pre, cur ) => {
      if( pre.address + pre.buffer.length >= cur.address - 1 ) {
        section.blocks.push( cur );
        section.size = section.size + cur.buffer.length;
      } else {
        section = { blocks: [ cur ], size: cur.buffer.length, start: cur.address };
        group.push( section );
      }
      return cur;
    } );
    
    const res = group.map( section => {
      const buffer = new Uint8Array( new ArrayBuffer( section.size ) );
      section.blocks.sort( ( a, b ) => a.order - b.order );
      section.blocks.forEach( block => {
        buffer.set( block.buffer, block.address - section.start );
      } )
      
      return buffer;
    } );
    
    console.log( res )
  }
}