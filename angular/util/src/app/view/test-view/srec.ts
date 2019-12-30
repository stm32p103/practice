type RecordType = '0' | '1' | '2' | '3' | '5' | '6' | '7' | '8' | '9';

export interface Block {
  address: number;
  buffer: Uint8Array;
}

export interface Record extends Block {
  type: RecordType;
}

export interface SRecord {
  blocks: Block[];
  header?: string;
  startAddress?: number;
  recordCount?: number;
}

// constant
enum AddressSizeEnum {
  Bit16 = 2,
  Bit24 = 3,
  Bit32 = 4
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

// レコードタイプごとのアドレスサイズ
const addressSizeMap: { [type: string]: AddressSizeEnum } = {
  '0': AddressSizeEnum.Bit16,
  '1': AddressSizeEnum.Bit16,
  '2': AddressSizeEnum.Bit24,
  '3': AddressSizeEnum.Bit32,
  '5': AddressSizeEnum.Bit16,
  '6': AddressSizeEnum.Bit24,
  '7': AddressSizeEnum.Bit32,
  '8': AddressSizeEnum.Bit24,
  '9': AddressSizeEnum.Bit16
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
    const addressSize = addressSizeMap[ recordType ];
    
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
    
    const addressSize = addressSizeMap[ type ];
    
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
