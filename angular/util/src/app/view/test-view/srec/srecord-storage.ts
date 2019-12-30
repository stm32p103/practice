import { Storage } from './storage';
import { SingleRecord, SRecord } from './type';

export class SRecordStorage {
  private order = 0;
  private storage: Storage;
  private header?: string;
  private startAddress?: number;
  private recordCount?: number;
  
  constructor() {
    this.storage = new Storage();
  }
  
  store( rec: SingleRecord ) {
    switch( rec.type ) {
    case '0':
      this.header = String.fromCharCode.apply( null, rec.buffer );
      break;
    case '1':
    case '2':
    case '3':
      this.storage.append( rec );
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
  
  toSRecord(): SRecord {
    const blocks = this.storage.merge();
    return {
      header: this.header,
      startAddress: this.startAddress,
      recordCount: this.recordCount,
      blocks: blocks
    };
  }
}
