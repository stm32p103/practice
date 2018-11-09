import { Component, AfterViewInit, ElementRef, NgZone } from '@angular/core';
import { desktopCapturer } from 'electron';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    public sources: Electron.DesktopCapturerSource[] = [];
    private video: any;
    constructor( private el: ElementRef, private zone: NgZone ) {    
    }

    ngAfterViewInit() {
        this.video = this.el.nativeElement.querySelector( 'video' );
        this.update();
    }
    
    select( id: string ) {
        console.log(id);
        let selected = this.sources.find( ( src ) => ( src.id === id ) );
        console.log( selected )
        
        if( !selected ) {
            throw new Error('NG');
        }
        
        let constraint: any = {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: id
                }
        };
        
        navigator.mediaDevices.getUserMedia( {
            audio: false,
            video: constraint
        } ).then( ( stream ) => {
            this.video.srcObject = stream;
            this.video.onloadedmetadata = ( e ) => { 
                this.video.play(); 
            };
        } );
    }
    
    update() {
        desktopCapturer.getSources( { types: ['window', 'screen'] }, ( err, sources ) => {
            if( err ) {
                throw err;
            }
            // https://angular.io/api/core/NgZone
            this.zone.run( () => {
                this.sources = sources;
            } )
        } );
    }
}

