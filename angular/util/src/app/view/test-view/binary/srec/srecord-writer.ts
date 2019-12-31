import { Block, BlockArrayIterator } from '../block';
import { SRecord, SingleRecord } from './type';
import { SingleWriter } from './single-writer';

export enum SRecordAddressLengthEnum {
  Bit16, Bit24, Bit32
}

const MAX_16BIT = Math.pow( 2, 16 ) - 1;

export interface SRecordWriteOption {
  maxData?: number;
  addressLength?: SRecordAddressLengthEnum;
  outputHeader?: boolean;
  outputCount?: boolean; 
  outputStartAddress?: boolean;
}

const defaultOption = {
  maxData: 16,
  addressLength: SRecordAddressLengthEnum.Bit32,
  outputHeader: true,
  outputCount: false,
  outputStartAddress: true
}

enum State {
  Header,
  Data,
  Count,
  StartAddress
}

/* ############################################################################
 * 以下の順でレコードを出力する
 * ヘッダ
 * データ
 * カウント(任意)
 * 開始番地(任意)
 * ######################################################################### */
export class SRecordWriter implements IterableIterator<string> {
  private readonly option: SRecordWriteOption;
  private readonly iterator: BlockArrayIterator;  
  private readonly states: State[] = [];
  private readonly writer = new SingleWriter();
  private readonly writeFunc: ( block: Block ) => string;
  private readonly addressFunc: ( address: number ) => string;
  private stateIndex = 0;
  private recordCount = 0;
  
  constructor( private srec: SRecord, option: SRecordWriteOption = {} ) {
    this.option = Object.assign( defaultOption, option );
    
    // 出力対象と順序を決める
    if( this.option.outputHeader && this.srec.header !== undefined ) {
      this.states.push( State.Header );
    }
    
    if( this.srec.blocks.length > 0 ) {
      this.states.push( State.Data );
    }
    
    if( this.option.outputCount ) {
      this.states.push( State.Count );
    }
    
    if( this.option.outputStartAddress && this.srec.startAddress !== undefined  ) {
      this.states.push( State.StartAddress );
    }
    
    this.iterator = new BlockArrayIterator( this.srec.blocks, this.option.maxData );
    
    switch( this.option.addressLength ) {
    case SRecordAddressLengthEnum.Bit16:
      this.writeFunc = ( block ) => this.writer.writeData16( block );
      this.addressFunc = ( address ) => this.writer.writeStartAddress16( address );
      break;
    case SRecordAddressLengthEnum.Bit24:
      this.writeFunc = ( block ) => this.writer.writeData24( block );
      this.addressFunc = ( address ) => this.writer.writeStartAddress24( address );
      break;
    case SRecordAddressLengthEnum.Bit32:
      this.writeFunc = ( block ) => this.writer.writeData32( block );
      this.addressFunc = ( address ) => this.writer.writeStartAddress32( address );
      break;
    default:
      throw new Error( 'Invalid Address Length.' );
    }
  }
  
  next(): IteratorResult<string> {
    let res;
    const state = this.states[ this.stateIndex ];
    
    switch( state ) {
    case State.Header:
      res = this.writer.writeHeader( this.srec.header );
      this.stateIndex++;
      break;
    case State.Data:
      let next = this.iterator.next();
      res = this.writeFunc( next.value );
      this.recordCount++;
      
      if( next.done ) {
        this.stateIndex++;
      }
      break;
    case State.Count:
      // SRecordのrecordCountを優先する。
      const count = ( this.srec.recordCount !== undefined ) ? this.srec.recordCount : this.recordCount; 
      
      // レコード数に応じて選ぶ
      if( count > MAX_16BIT ) {
        res = this.writer.writeCount24( count );
      } else {
        res = this.writer.writeCount16( count );
      }
      this.stateIndex++;
      break;
    case State.StartAddress:
      res = this.addressFunc( this.srec.startAddress );
      this.stateIndex++;
      break;
    default:
      throw new Error( `Unknown error. State:${state}` );
    }
    
    return {
      done: ( this.stateIndex >= this.states.length ),
      value: res
    };
  }
  
  [Symbol.iterator](): IterableIterator<string> {
    return this;
  }
}
