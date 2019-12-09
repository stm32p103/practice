import { ItemKey } from './item';
import { TaskKey } from './task';

/* ----------------------------------------------------------------------------
 * 変更セットのキー
 * ------------------------------------------------------------------------- */ 
export class ChangesetKey {
  constructor( public readonly key: string ) {}
}

/* ----------------------------------------------------------------------------
 * 変更セット
 * 外部システムからもらった最小限の情報のコンテナ。今はあまり振る舞いがない。
 * ミニレイヤになってしまうかもしれない。
 * ------------------------------------------------------------------------- */ 
export class Changeset {
  constructor(
    public readonly key: ChangesetKey,
    public readonly item: ItemKey,
    public readonly task: TaskKey ){}
}

/* ----------------------------------------------------------------------------
 * 変更セットリポジトリ
 * ------------------------------------------------------------------------- */
export interface ChangesetRepo {
  save( cs: Changeset ): Promise<void>;
  saveAll( cs: Changeset[] ): Promise<void>;
  remove( cs: Changeset ): Promise<void>;
  findByKey( key: ChangesetKey ): Promise<Changeset>;
  findByTask( task: TaskKey ): Promise<Changeset[]>;
  findByConfigurationItem( item: ItemKey ): Promise<Changeset[]>;
}
