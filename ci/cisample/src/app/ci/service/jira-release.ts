import { RestAPI, Request } from '../common/request';
import { ReleaseKey, Release } from '../entity/release';
/* ############################################################################

############################################################################ */
export class JiraReleaseKey extends ReleaseKey {
  constructor( id: string ) {
    super( `jira://${id}` );
  }
}

/* ############################################################################

############################################################################ */
export class JiraReleaseService {
  constructor( private api: RestAPI, private base ) {}
  
  async findAllRelease( project: string ): Promise<void> {
    const req = new Request( { 
      method: 'GET',
      url: `${this.base}/rest/api/2/project/${project}/versions`,
    } );

    let res;
    try {
      res = await this.api.request( req ).then( ( releases: any[] ) => {
        return releases.map( release => new Release( new JiraReleaseKey( release.id ) ) )
      } );
    } catch( e ) {
      // TBD: Error handling
      console.log( e );
    }
    
    return res;
  }
}
