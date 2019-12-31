import { Block } from './type';

/* ############################################################################
 * ブロックの先頭から順にmaxLengthで指定した長さのブロックに分割するイテレータ
 * ######################################################################### */
export class BlockIterator implements IterableIterator<Block> {
  private address: number;
  
  constructor( private readonly block: Block, private readonly maxLength: number ) {
    this.address = this.block.address;
  }
  
  next(): IteratorResult<Block> {
    const offset = this.address - this.block.address;
    const bufferLength = this.block.buffer.length;
    const length = Math.min( bufferLength - offset, this.maxLength );
    const block = {
      address: this.address,
      buffer: new Uint8Array( this.block.buffer.buffer, offset, length )
    };
    
    // 次に進める
    this.address += length;
    
    // offset + length = 走査済みデータ数がバッファサイズ以上なら完了
    const done = ( offset + length >= bufferLength );
    
    return {
      done: done,
      value: block
    };
  }
  
  [Symbol.iterator](): IterableIterator<Block> {
    return this;
  }
}
