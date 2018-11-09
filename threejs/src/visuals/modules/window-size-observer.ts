import { BehaviorSubject, Observable } from 'rxjs';

export interface WindowSize {
    w: number;
    h: number;
}

export class WindowSizeObserver {
    private currentSize: WindowSize;
    private sizeSubject: BehaviorSubject<WindowSize>;
    private handler: ( event: UIEvent ) => void = null;

    get size$(): Observable<WindowSize> {
        return this.sizeSubject;
    }

    get size(): WindowSize {
        return this.currentSize;
    }
    
    constructor() {
        this.updateSize();

        // after size updated, create subject
        this.sizeSubject = new BehaviorSubject( this.currentSize );
        
        // define handler
        this.handler = ( event: UIEvent ) => {
            this.updateSize();
            this.sizeSubject.next( this.currentSize );
        }
    }
    
    attatch(): void {
        window.addEventListener( 'resize', this.handler );
    }
    
    detatch(): void {
        window.removeEventListener( 'resize', this.handler );
    }

    private updateSize(): void {
        this.currentSize = {
            w: window.innerWidth,
            h: window.innerHeight
        };
    }
}

