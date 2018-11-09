import { EventObserver, EventObserverGroup } from './event-observer';

// convert mouse event to observable

export class MouseEventObserver {
    private mousedownObserver: EventObserver<MouseEvent>;
    private mouseupObserver: EventObserver<MouseEvent>;
    private mousemoveObserver: EventObserver<MouseEvent>;
    private clickObserver: EventObserver<MouseEvent>;
    private dblclickObserver: EventObserver<MouseEvent>;
    private mouseoverObserver: EventObserver<MouseEvent>;
    private mouseoutObserver: EventObserver<MouseEvent>;
    private mouseenterObserver: EventObserver<MouseEvent>;
    private mouseleaveObserver: EventObserver<MouseEvent>;
    private contextmenuObserver: EventObserver<MouseEvent>;
    private group: EventObserverGroup;

    constructor( private dom: HTMLElement ) {
        this.group = new EventObserverGroup();
        this.mousedownObserver   = this.group.add( new EventObserver<MouseEvent>( this.dom, 'mousedown' ) );
        this.mouseupObserver     = this.group.add( new EventObserver<MouseEvent>( this.dom, 'mouseup' ) );
        this.mousemoveObserver   = this.group.add( new EventObserver<MouseEvent>( this.dom, 'mousemove' ) );
        this.clickObserver       = this.group.add( new EventObserver<MouseEvent>( this.dom, 'click' ) );
        this.dblclickObserver    = this.group.add( new EventObserver<MouseEvent>( this.dom, 'dblclick' ) );
        this.mouseoverObserver   = this.group.add( new EventObserver<MouseEvent>( this.dom, 'mouseover' ) );
        this.mouseoutObserver    = this.group.add( new EventObserver<MouseEvent>( this.dom, 'mouseout' ) );
        this.mouseenterObserver  = this.group.add( new EventObserver<MouseEvent>( this.dom, 'mouseenter' ) );
        this.mouseleaveObserver  = this.group.add( new EventObserver<MouseEvent>( this.dom, 'mouseleave' ) );
        this.contextmenuObserver = this.group.add( new EventObserver<MouseEvent>( this.dom, 'contextmenu' ) );
    }

    get mousedown$() { return this.mousedownObserver.event$; }
    get mouseup$() { return this.mouseupObserver.event$; }
    get mousemove$() { return this.mousemoveObserver.event$; }
    get click$() { return this.clickObserver.event$; }
    get dblclick$() { return this.dblclickObserver.event$; }
    get mouseover$() { return this.mouseoverObserver.event$; }
    get mouseout$() { return this.mouseoutObserver.event$; }
    get mouseenter$() { return this.mouseenterObserver.event$; }
    get mouseleave$() { return this.mouseleaveObserver.event$; }
    get contextmenu$() { return this.contextmenuObserver.event$; }
    
    attatch(): void {
        this.group.attatch();
    }
    
    detatch(): void {
        this.group.detatch();
    }
}
