import { Block } from './type';

export interface OrderedBlock extends Block {
  order: number;
}

/* ############################################################################
 * 連続・オーバーラップした複数のブロックを一つのブロックにまとめるもの。
 * アドレス順に追加する必要がある
 * ######################################################################### */
export class ContinuousBlockMerger {
  private startAddress: number;
  private size: number;
  readonly blocks: OrderedBlock[];
  
  constructor( init: OrderedBlock ) {
    this.blocks = [ init ];
    this.size = init.buffer.length;
    this.startAddress = init.address;
  }
  
  appendIfContinuous( block: OrderedBlock ): boolean {
    const last = this.blocks[ this.blocks.length - 1  ];
    const isContinuous = ( last.address + last.buffer.length >= block.address - 1 );
    if( isContinuous ) {
      this.blocks.push( block );
      this.size += block.buffer.length;
    }
    
    return isContinuous;
  }
  
  merge(): Block {
    const buffer = new Uint8Array( new ArrayBuffer ( this.size ) );
    const blocks = this.blocks.slice().sort( ( a, b ) => a.order - b.order );
    
    blocks.forEach( block => {
      buffer.set( block.buffer, block.address - this.startAddress );
    } );
    
    return { address: this.startAddress, buffer: buffer };
  }
}
