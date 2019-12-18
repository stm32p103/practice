import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestAPI, RequestOption } from '@local/api';
/* ############################################################################

############################################################################ */
@Injectable()
export class RestAPIService implements RestAPI {
  constructor( private http: HttpClient ) {}
  
  async get( url: string, option?: RequestOption ): Promise<any> {
    let res;
    let header = {};
    if( option && option.header ) {
      header = option.header;
    }
    
    res = await this.http.get( url, { headers: header } ).toPromise();
    return res;
  }
  
  async post( url: string, option?: RequestOption ): Promise<any> {}
  async delete( url: string, option?: RequestOption ): Promise<any> {}
  async patch( url: string, option?: RequestOption ): Promise<any> {}
  async put( url: string, option?: RequestOption ): Promise<any> {}
}
