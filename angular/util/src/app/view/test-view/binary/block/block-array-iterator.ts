import { Block } from './type';
import { BlockIterator } from './block-iterator';

/* ############################################################################
 * ブロックの配列の先頭から順に
 * maxLengthで指定した長さのブロックに分割するイテレータ
 * ######################################################################### */
export class BlockArrayIterator implements IterableIterator<Block> {
  private index: number = 0;
  private iterator: BlockIterator;
  constructor( private blocks: Block[], private readonly maxLength: number ) {
    if( this.blocks.length === 0 ) {
      throw new Error( '"blocks" must have 1 or more Blocks.' )
    }
    
    this.iterator = this.nextIterator();
  }
  
  private nextIterator() {
    if( this.index < this.blocks.length ) {
      const itr = new BlockIterator( this.blocks[ this.index ], this.maxLength );
      this.index++;
      return itr;
    }
  }
  
  next(): IteratorResult<Block>  {
    const res = this.iterator.next();
    
    if( res.done ) {
      // ブロックのイテレーションが完了したら次のブロックに移動する
      const itr = this.nextIterator();
      
      if( itr !== undefined ) {
        this.iterator = itr;
        res.done = false;
      }
    }
    
    return res;
  }
  
  [Symbol.iterator](): IterableIterator<Block> {
    return this;
  }
}