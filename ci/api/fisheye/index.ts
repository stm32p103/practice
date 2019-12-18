import { RestAPI, queryToString, QueryObject } from '../rest-api';

/* ############################################################################
 * Endpoint: /rest-service-fe/repositories-v1
 * ######################################################################### */
export interface RepositoryList {
  repository: Repository[];
}

/* ############################################################################
 * Endpoint: /rest-service-fe/repositories-v1/Repository
 * ######################################################################### */
export interface Repository {
  name: string;
  displayName: string;
  enabled: boolean;
  finishedFullSlurp: boolean;
  repositoryState: string;
}

 /* ###########################################################################
 * Endpoint: /rest-service-fe/revisionData-v1/PathHistory
 * ######################################################################### */
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

/* ############################################################################
 * Endpoint: /rest-service-fe/revisionData-v1/ChangesetList
 * ######################################################################### */
export class GetChangesetListParam {
  readonly path: string;
  readonly start: Date;
  readonly end: Date;
  readonly maxReturn: number;
  constructor( init: Partial<GetChangesetListParam> ) {
    Object.assign(this, init);
  }
  
  toString(): string {
    const params: QueryObject = {};
    
    params[ 'path' ] = this.path;
    
    if( this.start ) {
      params[ 'start' ] = this.start.toISOString();    
    }
    
    if( this.end ) {
      params[ 'end' ] = this.end.toISOString();
    }
    
    if( this.maxReturn ) {
      params[ 'maxReturn' ] = ( this.maxReturn > 0) ? this.maxReturn.toFixed( 0 ) : "0";
    }
    
    return queryToString( params );
  }
}

export interface ChangesetList {
  resultsTruncated: boolean;  // 結果が取得しきれない時は truncated が true となるので、取得は小分けにした方が良い
  csid: string[];
}

 /* ###########################################################################
 * Endpoint: RevisionData/Changeset
 * ######################################################################### */
export interface Changeset {
  author: string;
  branch: string;
  branches: string[];
  children: string[];
  comment: string;
  csid: string;
  date: Date;
  displayId: string;
  fileRevisionKey: { path: string, rev: string }[];
  parent: string[];
  repositoryName: string;
}


/* ############################################################################
 * Fisheye REST API をそのまま表現する
 * エラーハンドリングは今後作る
 * ######################################################################### */
export class FisheyeAPI {
  constructor( private readonly api: RestAPI, private readonly base ) {}
  
  async getAllRepositories(): Promise<Repository[]> {
    const url = `${this.base}/rest-service-fe/repositories-v1`;
    let res: RepositoryList;
    
    try {
      res = ( await this.api.get( url ) ) as RepositoryList;
    } catch( err ) {
      // TBD
      console.log( err );
      // TBD
    }
    
    // DEBUG
    // console.log( res );
    // DEBUG
    
    if( res.repository ) {
      return res.repository;
    }
  }
  
  async getRepository( repo: string ): Promise<Repository> {
    const url = `${this.base}/rest-service-fe/repositories-v1/${repo}`;
    let res: Repository;
    
    try {
      res = ( await this.api.get( url ) ) as Repository;
    } catch( err ) {
      // TBD
      console.log( err );
      // TBD
    }
    
    // DEBUG
    // console.log( res );
    // DEBUG
    
    return res;
  }

  async getChangesetList( repo: string, param?: GetChangesetListParam ): Promise<ChangesetList> {
    const query = param ? param.toString() : '';
    const url = `${this.base}/rest-service-fe/revisionData-v1/changesetList/${repo}${query}`;
    let res: ChangesetList;
    
    try {
      res = await this.api.get( url ) as ChangesetList;
    } catch( err ) {
      // TBD
      console.log( err );
      // TBD
    }
    
    // DEBUG
    // console.log( res );
    // DEBUG
    
    return res;
  }
  
  async getChangeset( repo: string, csid: string ): Promise<Changeset> {
    const url = `${this.base}/rest-service-fe/revisionData-v1/changeset/${repo}/${csid}`;
    let res: Changeset;
    
    try {
      res = await this.api.get( url ) as Changeset;
    } catch( err ) {
      // TBD
      console.log( err );
      // TBD
    }
    
    // DEBUG
    // console.log( res );
    // DEBUG
    return res;
  }
  
  async getPathHistory( repo: string, path: string ='/' ): Promise<PathHistoryList> {
    const url = `${this.base}/rest-service-fe/revisionData-v1/pathHistory/${repo}?path=${path}`;

    let res: PathHistoryList;
    try {
      res = await this.api.get( url ) as PathHistoryList;
    } catch( err ) {
      // TBD
      console.log( err );
      // TBD
    }
    
    // DEBUG
    // console.log( res );
    // DEBUG
    return res;
  }
}
