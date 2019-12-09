import { ItemKey } from './item';
import { TaskKey } from './task';

/* ----------------------------------------------------------------------------
 * 影響のキー
 * ------------------------------------------------------------------------- */ 
export class EffectKey {
  constructor( public readonly key: string ) {}
}

/* ----------------------------------------------------------------------------
 * 影響
 * マニュアルで設定するかもしれないが、SCMから読み出すかもしれない。
 * なので、あまり振る舞いが無い。(良いのだろうか?)
 * ------------------------------------------------------------------------- */ 
export class Effect {
  constructor( 
    public readonly key: EffectKey,
    public readonly item: ItemKey,
    public readonly task: TaskKey ) {}
}

/* ----------------------------------------------------------------------------
 * ベースラインリポジトリ
 * ------------------------------------------------------------------------- */
export interface EffectRepository {
  save( effect: Effect ): Promise<void>;
  saveAll( effect: Effect[] ): Promise<void>;
  remove( effect: Effect ): Promise<void>;
  findByKey( effect: Effect ): Promise<Effect>;
  findByEffectedItem( item: ItemKey ): Promise<Effect>;
  findByEffectedTask( task: TaskKey ): Promise<Effect>;
}
