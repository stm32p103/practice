import { Subject, Observable } from 'rxjs';

// Angular外でイベントを扱いやすくするための仕組み

export class EventObserver<EVENT> {
    private _event$: Subject<EVENT> = new Subject();
    private handler: ( event: any ) => void;
    get event$(): Observable<EVENT> { return this._event$ }
    
    constructor( private dom: HTMLElement, private eventType: string ) {
       this.handler = ( event: EVENT ) => { this._event$.next( event ) };
    }
    
    attatch(): void {
        this.dom.addEventListener( this.eventType, this.handler );
    }
    
    detatch(): void {
        this.dom.removeEventListener( this.eventType, this.handler )
    }
}

export class EventObserverGroup {
    private eventGroup: EventObserver<any>[] = [];
    constructor() {}
    
    add( eventObserver: EventObserver<any> ): EventObserver<any> {
        this.eventGroup.push( eventObserver );
        return eventObserver;
    }
    
    clear(): void {
        this.detatch();
        this.eventGroup = [];
    }
    
    attatch(): void {
        for( let e of this.eventGroup ) {
            e.attatch();
        }
    }
    
    detatch(): void {
        for( let e of this.eventGroup ) {
            e.detatch();
        }
    }
}
