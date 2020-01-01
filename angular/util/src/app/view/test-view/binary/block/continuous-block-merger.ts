import { Block } from './type';

export interface OrderedBlock extends Block {
  order: number;
}

/* ############################################################################
 * 連続・オーバーラップした複数のブロックを一つのブロックにまとめるもの。
 * アドレス順に追加する必要がある
 * ######################################################################### */
export class ContinuousBlockMerger {
  private readonly blocks: OrderedBlock[] = [];
  private startAddress: number;     // 先頭番地
  private endAddress: number;       // 最終番地(要素数0なら、先頭番地-1になる)
  
  appendIfContinuous( block: OrderedBlock ): boolean {
    if( this.blocks.length === 0 ) {
      this.startAddress = block.address;
      this.endAddress = block.address + block.buffer.length - 1;
    }
    
    const isContinuous = ( block.address <= this.endAddress + 1 );
    if( isContinuous ) {
      this.blocks.push( block );
      this.endAddress = Math.max( this.endAddress, block.address + block.buffer.length - 1 );
    }
    return isContinuous;
  }
  
  merge(): Block {
    if( this.blocks.length > 0 ) {
      const size = this.endAddress - this.startAddress + 1;
      const buffer = new Uint8Array( new ArrayBuffer ( size ) );
      const blocks = this.blocks.slice().sort( ( a, b ) => a.order - b.order );
      
      blocks.forEach( block => {
        buffer.set( block.buffer, block.address - this.startAddress );
      } );
      
      return { address: this.startAddress, buffer: buffer };
    }
  }
}
