import { RestAPI, Request } from '../common/request';
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

export interface GetPathListParam {
  path?: string;
}


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
//
//
//  async getPathList( repo: string, param: GetPathListParam ) {
//    
//    const req = new Request( { 
//      method: 'GET',
//      url: `${this.base}/rest-service-fe/revisionData-v1/pathList/{repo},
//      
//    } );
//
//    let res: any;
//    
//    try {
//      res = await this.api.request( req );
//    } catch( err ) {
//      console.log( err );
//    }
//    
//    return res;
//  }
}
