import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FisheyeAPI, GetChangesetListParam } from '@local/api'; 
import { AngularRestAPI } from './api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public res: string;
  private api: AngularRestAPI;
  private fisheye: FisheyeAPI;
  constructor( private http: HttpClient ) {
    this.api =  new AngularRestAPI( this.http );
    this.fisheye = new FisheyeAPI( this.api, 'http://localhost:10000/fisheye' );
  }
  
  getRepository( repo: string ) {
    this.fisheye.getRepository( repo ).then( res => {
      this.res = JSON.stringify( res, null, 4 );
    } );
  }
  
  getRepositories() {
    this.fisheye.getAllRepositories().then( res => {
      this.res = JSON.stringify( res, null, 4 );
    } );
  }
  
  getChangesetList( repo: string ) {
    this.fisheye.getChangesetList( repo, new GetChangesetListParam( { path: '/ci/cisample' } ) ).then( res => {
      this.res = JSON.stringify( res, null, 4 );
    } );
  }
  
  getChangeset( repo: string, csid: string ) {
    this.fisheye.getChangeset( repo, csid ).then( res => {
      this.res = JSON.stringify( res, null, 4 );
    } );
  }
  
  getPathHistory( repo: string, path: string ) {
    this.fisheye.getPathHistory( repo, path ).then( res => {
      this.res = JSON.stringify( res, null, 4 );
    } );
  }
}
