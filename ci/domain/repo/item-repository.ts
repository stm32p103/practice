import { ItemKey, Item } from '../entity'

/* ----------------------------------------------------------------------------
 * 構成品目リポジトリ
 * ------------------------------------------------------------------------- */ 
export interface ItemRepository {
  add( item: Item ): Promise<Item>;
  remove( item: Item ): Promise<void>;
  getByPath( path: string ): Promise<Item>;
}
