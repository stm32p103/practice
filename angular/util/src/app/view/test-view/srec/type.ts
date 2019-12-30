export type RecordType = '0' | '1' | '2' | '3' | '5' | '6' | '7' | '8' | '9';

export interface Block {
  address: number;
  buffer: Uint8Array;
}

export interface SingleRecord extends Block {
  type: RecordType;
}

export interface OrderedBlock extends Block {
  order: number;
}

export interface SRecord {
  header?: string;
  startAddress?: number;
  recordCount?: number;
  blocks: Block[];
}
