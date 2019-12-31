import { SRecord, SingleRecord } from './type';
import { BlockMerger } from '../block-merger';

/* ############################################################################
 * SRecordを読み込み中の情報を保持するクラス
 * SingleRecordを読み込む過程で、ヘッダや開始アドレス、レコード数等を更新する。
 * バッファについては、同じ領域を複数回書く可能性もあるので、
 * Storageクラスで最終的なメモリの状態を可能な限り連続したブロックで
 * 表現できるようにしている。
 * ######################################################################### */
export class SRecordReader {
  private merger: BlockMerger;
  private header?: string;
  private startAddress?: number;
  private recordCount?: number;
  
  constructor() {
    this.merger = new BlockMerger();
  }
  
  read( rec: SingleRecord ) {
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
