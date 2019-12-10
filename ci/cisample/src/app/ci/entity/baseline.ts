
export class BaselineTypeKey {
  constructor( public readonly key: string ) {}
}

export class BaselineKey {
  constructor( public readonly key: string ) {}
}

/* ----------------------------------------------------------------------------
 * ベースライン
 * ----------------------------------------------------------------------------
 * 当座はロジックを持たない、外部のタスク管理ツールと繋ぐための情報置場とする。
 * Jiraそのもののベースラインとは直接連携したいが、現状のJira運用上はできない。
 * ベースラインの階層を許し、CIの種類からタスクの完了期限を設定するなどの機能は
 * 提供したい。なので、ベースラインの親子関係を持たせるのはやっていきたいかもしれない。
 * 例えば baseline.createSub( 'name' ) のようにする。
 * ------------------------------------------------------------------------- */
export class Baseline {
  key: BaselineKey;
  type: BaselineTypeKey;
}

/* ----------------------------------------------------------------------------
 * ベースラインリポジトリ
 * ------------------------------------------------------------------------- */
export interface BaselineRepository {
  save( baseline: Baseline ): Promise<void>;
  saveAll( baselines: Baseline[] ): Promise<void>;
  remove( baseline: Baseline ): Promise<void>;
  findByKey( baseline: Baseline ): Promise<Baseline>;
}
