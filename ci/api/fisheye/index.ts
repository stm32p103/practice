import { RestAPI, Request } from '../request';
/* ############################################################################
 * Fisheye REST API の戻り値
 * ######################################################################### */
export interface RepositoryList {
  repository: Repository[];
}

export interface Repository {
  name: string;
  displayName: string;
  enabled: boolean;
  finishedFullSlurp: boolean;
  repositoryState: string;
}

export interface RepositoryList {
  repository: Repository[];
}

// 結果が取得しきれない時は truncated が true となるので、取得は小分けにした方が良い
export interface ChangesetList {
  resultsTruncated: boolean;
  csid: string[];
}

//-----------------------------------------------------------------------------
export interface Changeset {
  author: string;
  branch: string;
  branches: string[];
  children: string[];
  comment: string;
  csid: string;
  date: Date;
  displayId: string;
  fileRevisionKey: { path: string, csid: string }[];
  parent: string[];
  repositoryName: string;
}

//-----------------------------------------------------------------------------
export interface PathHistoryList {
  fileRevision: PathHistory[];
}

export interface PathHistory {
  ancestry: string[];
  author: string;
  comment: string;
  contentLink: string;
  date: Date;
  fileRevisionState: string;
  lineAdded: number;
  lineRemoved: number;
  path: string;
  rev: string;
  totalLines: number;
}
//-----------------------------------------------------------------------------


export class GetChangesetListParam {
  readonly path: string;
  readonly start: Date;
  readonly end: Date;
  readonly maxReturn: number;
  constructor( init: Partial<GetChangesetListParam> ) {
    Object.assign(this, init);      
  }
  toString(): string {
    const params = [];
    let res = '';
    
    if( this.path ) {
      params.push( `path=${this.path}` );
    }
    
    if( this.start ) {
      params.push( `start=${this.start.toISOString()}` );
    }
    
    if( this.end ) {
      params.push( `end=${this.end.toISOString()}` );
    }
    
    if( this.maxReturn !== undefined&& this.maxReturn>0 ) {
      params.push( `maxReturn=${this.maxReturn.toFixed(0)}` );
    }
    
    if( params.length > 0 ) {
      res = '?' + params.join( '&' );
    }
    
    return res;
  }
}

/* ############################################################################
 * Fisheye REST API をそのまま表現する
 * エラーハンドリングは今後作る
 * ######################################################################### */
export class FisheyeAPI {
  constructor( private readonly api: RestAPI, private readonly base ) {}
  
  async getAllRepositories(): Promise<Repository[]> {
    const req = Request.get( `${this.base}/rest-service-fe/repositories-v1` );

    let res: any;
    
    try {
      res = await this.api.request( req );
    } catch( err ) {
      console.log( err );
    }

    console.log( res );
    return res.repository;
  }
  
  async getRepository( repo: string ): Promise<Repository> {
    const req = Request.get( `${this.base}/rest-service-fe/repositories-v1/${repo}` );

    let res: any;
    
    try {
      res = await this.api.request( req );
    } catch( err ) {
      console.log( err );
    }
    
    console.log( res );
    return res;
  }

  async getChangesetList( repo: string, param?: GetChangesetListParam ): Promise<ChangesetList> {
    const query = param ? param.toString() : '';
    const req = Request.get( `${this.base}/rest-service-fe/revisionData-v1/changesetList/${repo}${query}` );

    let res: ChangesetList;
    
    try {
      res = await this.api.request( req );
    } catch( err ) {
      console.log( err );
    }
    
    console.log( res );
    return res;
  }
  
  async getChangeset( repo: string, csid: string ): Promise<Changeset> {
    const req = Request.get( `${this.base}/rest-service-fe/revisionData-v1/changeset/${repo}/${csid}` );

    let res: Changeset;
    
    try {
      res = await this.api.request( req );
    } catch( err ) {
      console.log( err );
    }
    
    console.log( res );
    return res;
  }
  
  async getPathHistory( repo: string, path: string ='/' ): Promise<PathHistoryList> {
    const req = Request.get( `${this.base}/rest-service-fe/revisionData-v1/pathHistory/${repo}?path=${path}` );

    let res: PathHistoryList;
    try {
      res = await this.api.request( req ) as PathHistoryList;
    } catch( err ) {
      console.log( err );
    }
    
    return res;
  }
}
