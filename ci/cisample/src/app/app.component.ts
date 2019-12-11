import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularRestAPI } from './ci/common/web';
import { JiraReleaseService } from './ci/service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor( private http: HttpClient ) {
    let test = new JiraReleaseService( new AngularRestAPI( this.http ), 'http://localhost:10000/jira' );
    
    test.findAllRelease( 'BRD' ).then( res => {
      console.log( res );
    } );
  }
}


