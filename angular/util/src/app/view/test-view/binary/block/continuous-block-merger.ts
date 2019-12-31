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
  private size: number = 0;
  private startAddress: number;
  
  appendIfContinuous( block: OrderedBlock ): boolean {
    let isContinuous;
    let size;
    if( this.blocks.length > 0 ) {
      const last = this.blocks[ this.blocks.length - 1 ];
      isContinuous = ( last.address + last.buffer.length >= block.address - 1 );
    } else {
      isContinuous = true;
      this.startAddress = block.address;
    }
    
    if( isContinuous ) {
      this.blocks.push( block );
      this.size = Math.max( this.size, block.buffer.length + block.address - this.startAddress );
    }
    return isContinuous;
  }
  
  merge(): Block {
    if( this.blocks.length > 0 ) {
      const buffer = new Uint8Array( new ArrayBuffer ( this.size ) );
      const blocks = this.blocks.slice().sort( ( a, b ) => a.order - b.order );
      
      blocks.forEach( block => {
        buffer.set( block.buffer, block.address - this.startAddress );
      } );
      
      return { address: this.startAddress, buffer: buffer };
    }
  }
}
