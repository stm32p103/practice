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
    
    if( this.blocks.length == 0 ) {
      return res;
    }
    
    // sort blocks by address
    const blocks = this.blocks.slice().sort( ( a, b ) => a.address - b.address );
    
    const mergers = blocks.reduce( ( mergers, block ) => {
      let merger = mergers[ mergers.length - 1 ];

      const added = merger.appendIfContinuous( block );
      if( !added ) {
        merger = new ContinuousBlockMerger( block );
        mergers.push( merger );
      }
      return mergers;
    }, [ new ContinuousBlockMerger() ] );
    
    // この時点で空のsectionは存在しないから、ガードは不要
    return mergers.map( merger => merger.merge() );
  }
}
