import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestAPI, Request } from '../request';
/* ############################################################################

############################################################################ */

export class AngularRestAPI implements RestAPI {
  constructor( private http: HttpClient ) {}
  
  async request( req: Request ): Promise<any> {
    let res;
    switch( req.method ) {
      case 'GET':
        res = await this.http.get( req.url ).toPromise();
        break;
    }
    
    return res;
  }
}
