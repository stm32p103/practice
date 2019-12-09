
export class BaselineTypeKey {
  constructor( public readonly key: string ) {}
}

export class BaselineKey {
  constructor( public readonly key: string ) {}
}

/* ----------------------------------------------------------------------------
 * ベースライン
 * これも外部システムから持ってくることが主なので、振る舞いがあまりなさそう。
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
