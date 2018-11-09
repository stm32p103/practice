import {
    Vector3,
    Object3D,
} from 'three';
​
import { AbstractMouseControl } from './control';
import { MouseEventObserver } from '../modules';

export class MoveObject extends AbstractMouseControl {
    private sx: number;
    private sy: number;
    private ex: number;
    private ey: number;

    private org: Vector3;
    constructor( event: MouseEventObserver, private target: Object3D ) {
        super( event );
    }
    
    mouseDown( event: MouseEvent ): void {
        this.sx = event.offsetX;
        this.sy = event.offsetY;
        this.org = this.target.position.clone();
    }
    
    mouseMove( event: MouseEvent ): void {
        this.move( event );
    }
    
    mouseUp( event: MouseEvent ): void {
        this.move( event );
    }
    
    private move( event: MouseEvent ): void {
        this.ex = event.offsetX;
        this.ey = event.offsetY;

        const dx = this.ex - this.sx;
        const dy = this.ey - this.sy;
        this.target.position.addVectors( this.org, new Vector3( -dx, -dy, 0 ) );
        this.target.updateMatrix();
    }
}

