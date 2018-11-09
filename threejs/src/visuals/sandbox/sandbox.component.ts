import { Component, AfterViewInit, ElementRef } from '@angular/core';

import { WindowSizeService } from '../services/window-size';

import { Sandbox } from './sandbox';
import { OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { map } from "rxjs/operators";


@Component( {
    selector: 'sandbox',
    template: ''
} )
export class SandboxComponent implements OnDestroy, AfterViewInit {
    private sandbox: Sandbox;
    private subscription: Subscription;
    constructor( private el: ElementRef, private windowSize: WindowSizeService ) {
    }
    
    ngAfterViewInit(): void {
        this.sandbox = new Sandbox( this.el.nativeElement );

        // initial render
        this.subscription = this.windowSize.size$.pipe( map( ( size ) => {
            this.sandbox.resize( size.w, size.h );
            this.sandbox.render();
        } ) ).subscribe();
        
        this.sandbox.render();
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

