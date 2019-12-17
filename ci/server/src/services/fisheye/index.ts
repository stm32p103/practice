import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/common';
import { RestAPI, Request, RequestOption, FisheyeAPI } from '@local/api';
/* ############################################################################

############################################################################ */

export class NestRestAPI implements RestAPI {
  constructor( private http: HttpService ) {}
  
  async request( req: Request ): Promise<any> {
    let res;
    const header: { [name:string]: string | string[] } = req.header || {}; 
    
    switch( req.method ) {
      case 'GET':
        res = await this.http.get( req.url, { headers: header } ).toPromise();
        break;
    }
    return res;
  }
}

@Injectable()
export class FisheyeService {
  api: FisheyeAPI;
  constructor( http: HttpService ) {
    this.api = new FisheyeAPI( new NestRestAPI( http ), 'http://localhost:8060' );
  }
  
  
}
