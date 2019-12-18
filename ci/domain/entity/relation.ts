import { ItemKey } from './item';
import { TaskKey } from './task';

/* ----------------------------------------------------------------------------
 * 影響のキー
 * ------------------------------------------------------------------------- */ 
export class RelationKey {
  constructor( public readonly key: string ) {}
}

/* ----------------------------------------------------------------------------
 * 関係
 * ----------------------------------------------------------------------------
 * マニュアルで設定するかもしれないが、SCMから読み出すかもしれない。
 * あまり振る舞いが無い。
 * ----------------------------------------------------------------------------
 * TODO: タスクとの関係の種類を変えられるようにする
 *   optional:  変更セットが無くても良い(関係するかもしれないとあいまいに明示)
 *   required]: 変更セットが必要
 *   unrelated: 無関係を明示
 * ------------------------------------------------------------------------- */ 
export class Relation {
  constructor( 
    public readonly key: RelationKey,
    public readonly item: ItemKey,
    public readonly task: TaskKey ) {}
}

/* ----------------------------------------------------------------------------
 * ベースラインリポジトリ
 * ------------------------------------------------------------------------- */
export interface RelationRepository {
  save( rel: Relation ): Promise<void>;
  saveAll( rel: Relation[] ): Promise<void>;
  remove( rel: Relation ): Promise<void>;
  findByKey( rel: Relation ): Promise<Relation>;
  findByRelatedItem( item: ItemKey ): Promise<Relation>;
  findByRelateddTask( task: TaskKey ): Promise<Relation>;
}
