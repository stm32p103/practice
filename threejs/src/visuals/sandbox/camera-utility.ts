import {
    WebGLRenderer,
    OrthographicCamera
} from 'three';
​
export class CameraUtility {
    constructor( private renderer: WebGLRenderer, private camera: OrthographicCamera ) {}
    
    sync( width: number, height: number ): void {
        // update camera size
        this.camera.right = width;
        this.camera.bottom = height;
        this.camera.updateProjectionMatrix();
        
        // update renderer size
        this.renderer.setSize( width, height );
    }
}
