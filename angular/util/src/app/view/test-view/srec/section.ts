import { OrderedBlock, Block } from './type';

export class Section {
  private startAddress: number;
  private size: number;
  private blocks: OrderedBlock[];
  
  constructor( init: OrderedBlock ) {
    this.blocks = [ init ];
    this.size = init.buffer.length;
    this.startAddress = init.address;
  }
  
  append( block: OrderedBlock ) {
    this.blocks.push( block );
    this.size += block.buffer.length;
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
