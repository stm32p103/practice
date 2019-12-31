import { Block } from '../type';

export interface OrderedBlock extends Block {
  order: number;
}
