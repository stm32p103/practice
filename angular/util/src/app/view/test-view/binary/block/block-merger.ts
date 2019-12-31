import { Block } from './type';
import { ContinuousBlockMerger, OrderedBlock } from './continuous-block-merger';

/* ############################################################################
 * メモリ空間を模擬し、複数のブロックを書きこんだ最終結果を、
 * 極力まとめた複数のブロックにまとめる。
 * ######################################################################### */
export class BlockMerger {
  private order: number = 0;
  readonly blocks: OrderedBlock[] = [];
  
  append( block: Block ) {
    this.blocks.push( { ...block, order: this.order } );
    this.order++;
  }
  
  merge(): Block[] {
    const res: Block[] = [];
    
    if( this.blocks.length > 0 ) {
      const blocks = this.blocks.slice().sort( ( a, b ) => a.address - b.address );
      const sections = blocks.reduce( ( sections, block ) => {
        const isContinuous = sections[ sections.length - 1 ].appendIfContinuous( block );
        if( !isContinuous ) {
          sections.push( new ContinuousBlockMerger() );
        }
        return sections;
      }, [ new ContinuousBlockMerger() ] );
      
      sections.forEach( section => {
        const tmp = section.merge();
        if( tmp ) {
          res.push( tmp );
        }
      } );
      
      console.log( blocks )
    }
    return res;
  }
}
