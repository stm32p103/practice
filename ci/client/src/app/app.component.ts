import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FisheyeAPI, GetChangesetListParam, RestAPI } from '@local/api'; 
import { RestAPIService } from './api';

import { from, interval } from 'rxjs';
import { tap, flatMap, reduce } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public res: string;
  private api: RestAPI;
  private fisheye: FisheyeAPI;
  constructor( api: RestAPIService ) {
    this.fisheye = new FisheyeAPI( api, 'http://localhost:10000/fisheye' );
  }
  
  async getRepository( repo: string ) {
    await this.fisheye.getRepository( repo ).then( res => {
      this.res = JSON.stringify( res, null, 4 );
    } );
  }
  
  async getRepositories() {
    await this.fisheye.getAllRepositories().then( res => {
      this.res = JSON.stringify( res, null, 4 );
    } );
  }
  
  async getChangesetList( repo: string ) {
    await this.fisheye.getChangesetList( repo, new GetChangesetListParam( { path: '/ci/cisample' } ) ).then( res => {
      this.res = JSON.stringify( res, null, 4 );
    } );
  }
  
  async getChangeset( repo: string, csid: string ) {
    await this.fisheye.getChangeset( repo, csid ).then( res => {
      this.res = JSON.stringify( res, null, 4 );
    } );
  }
  
  async getPathHistory( repo: string, path: string ) {
    await this.fisheye.getPathHistory( repo, path ).then( res => {
      this.res = JSON.stringify( res, null, 4 );
    } );
    
    await this.test()
  }
  
  async test() {
    let res = await this.fisheye.getChangesetList( 'Practice' );
    const rev: { [path: string]: string[] } = {};
    const obs = from( res.csid );
    
    const a = await obs.pipe( 
      flatMap( id => from( this.fisheye.getChangeset( 'Practice', id ) ) ),
      flatMap( cs => from( cs.fileRevisionKey ) ),
      reduce( ( acc, val: any ) => {
        acc[ val.path ] = val.rev;
        return acc;
      }, {} )  ).toPromise();
    console.log( a );
  }
}
