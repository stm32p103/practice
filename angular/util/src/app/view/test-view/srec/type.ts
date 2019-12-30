export type RecordType = '0' | '1' | '2' | '3' | '5' | '6' | '7' | '8' | '9';

export interface Block {
  address: number;
  buffer: Uint8Array;
}

export interface Record extends Block {
  type: RecordType;
}

export interface OrderedBlock extends Block {
  order: number;
}

export interface Section {
  blocks: OrderedBlock[];
  size: number;
  start: number;
}
