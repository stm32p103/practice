import { OrderedBlock, Block } from './type';
import { Section } from './section';

export class Storage {
  private order = 0;
  blocks: OrderedBlock[] = [];
  
  append( block: Block ) {
    this.blocks.push( { ...block, order: this.order } );
    this.order++;
  }
  
  merge(): Block[] {
    const blocks = this.blocks.slice().sort( ( a, b ) => a.address - b.address );
    let section = new Section( blocks[0] );
    const sections = [ section ];
    
    blocks.reduce( ( pre, cur ) => {
      if( pre.address + pre.buffer.length >= cur.address - 1 ) {
        section.append( cur );
      } else {
        section = new Section( cur );
        sections.push( section );
      }
      return cur;
    } );
    
    return sections.map( section => section.merge() );
  }
}
