import { SRecord, SingleRecord } from './type';
import { BlockMerger } from '../block';
import { SingleReader } from './single-reader';

/* ############################################################################
 * SRecordを読み込み中の情報を保持し、最終的なSRecordオブジェクトを生成する
 * ######################################################################### */
export class SRecordReader {
  private merger: BlockMerger = new BlockMerger();
  private reader = new SingleReader();
  
  private header?: string;
  private startAddress?: number;
  private recordCount?: number;
  
  read( str: string ) {
    const rec = this.reader.read( str );
    switch( rec.type ) {
    case '0':
      this.header = String.fromCharCode.apply( null, rec.buffer );
      break;
    case '1':
    case '2':
    case '3':
      this.merger.append( rec );
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
  
  toSRecord(): SRecord {
    const blocks = this.merger.merge();
    return {
      header: this.header,
      startAddress: this.startAddress,
      recordCount: this.recordCount,
      blocks: blocks
    };
  }
}
