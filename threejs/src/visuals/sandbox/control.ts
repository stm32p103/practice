import { MouseEventObserver } from '../modules'

import { Subscription, Observable } from 'rxjs';
import { map, flatMap, takeUntil } from 'rxjs/operators';

export abstract class AbstractMouseControl {
    private observable: Observable<void>;

    constructor( private event: MouseEventObserver ) {
        this.observable = this.event.mousedown$.pipe(
            flatMap( ( event ) => {
                this.mouseDown( event );
                
                return this.event.mousemove$.pipe(
                    map( ( event ) => this.mouseMove( event ) ),
                    takeUntil( this.event.mouseup$.pipe( map( ( event ) => { this.mouseUp( event ) } ) ) )
                )
            } ) );
    }

    protected abstract mouseDown( event: MouseEvent ): void;
    protected abstract mouseMove( event: MouseEvent ): void;
    protected abstract mouseUp( event: MouseEvent ): void;
    
    get control$() {
        return this.observable;
    }
}
