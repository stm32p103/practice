import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestAPI, Request, RequestOption } from '../request';
/* ############################################################################

############################################################################ */

export class AngularRestAPI implements RestAPI {
  constructor( private http: HttpClient ) {}
  
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
