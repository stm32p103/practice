export class ReleaseKey {
  constructor( public readonly key: string ) {}
}

/* ----------------------------------------------------------------------------
 * リリース
 * ----------------------------------------------------------------------------
 * ベースラインが属する一番大きな単位。
 * ------------------------------------------------------------------------- */
export class Release {
  constructor( public readonly key: ReleaseKey ){}
}

/* ----------------------------------------------------------------------------
 * リリースリポジトリ
 * ------------------------------------------------------------------------- */
export interface ReleaseRepository {
  save( release: Release ): Promise<void>;
  saveAll( release: Release[] ): Promise<void>;
  remove( release: Release ): Promise<void>;
  findByKey( release: Release ): Promise<Release>;
}
