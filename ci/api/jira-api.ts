import { RestAPI, Request } from './request';
///* ############################################################################
//
//############################################################################ */
//export class JiraReleaseKey extends ReleaseKey {
//  constructor( id: string ) {
//    super( `jira://${id}` );
//  }
//}
//
///* ############################################################################
//
//############################################################################ */
//export class JiraReleaseService {
//  constructor( private api: RestAPI, private base ) {}
//  
//  /* 指定したプロジェクトのリリースを取得する */
//  async findAllRelease( project: string ): Promise<Release[]> {
//    const req = new Request( { 
//      method: 'GET',
//      url: `${this.base}/rest/api/2/project/${project}/versions`,
//    } );
//
//    let res: any[];
//    
//    try {
//      res = ( await this.api.request( req ) ) as any[];
//    } catch( e ) {
//      // TBD: Error handling
//      console.log( e );
//    }
//    
//    // 失敗したら undefined, エラーハンドリングは別途
//    // translatorいる
//    if( res && res.length ) {
//      return res.map( release => new Release( new JiraReleaseKey( release.id ) ) );
//    }
//  }
//  
////  async findByKey( key: ReleaseKey ) {
////    const versionKey
////    const req = new Request( { 
////      method: 'GET',
////      url: `${this.base}/rest/api/2/veresion/${project}/versions`,
////    } );
////
////    let res;
////    try {
////      res = await this.api.request( req ).then( ( releases: any[] ) => {
////        return releases.map( release => new Release( new JiraReleaseKey( release.id ) ) )
////      } );
////    } catch( e ) {
////      // TBD: Error handling
////      console.log( e );
////    }
////    
////    return res;
////  }
//} 
