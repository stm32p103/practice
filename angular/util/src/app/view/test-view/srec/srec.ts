import { OrderedBlock, Record, Section } from './type';
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