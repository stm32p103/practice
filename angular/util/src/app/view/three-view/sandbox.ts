import {
    WebGLRenderer,
    Scene,
    Camera,
    OrthographicCamera
} from 'three';
​
export class Sandbox {
    private width: number;
    private height: number;
    private renderer: WebGLRenderer;
    private _scene: Scene;
    private _camera: OrthographicCamera;
     
    get scene(): Scene { return this._scene }
    get camera(): Camera { return this._camera }
 
    constructor( private el: HTMLCanvasElement ) {
      this.renderer = new WebGLRenderer( {
        canvas: el,
        alpha: false,
        antialias: true
      } );
      this._scene = new Scene();
    }
 
    private updateSize(): void {}
 
    init(): void {
        // update camera & renderer size
        this.updateSize();
         
        // init camera
        this._camera = new OrthographicCamera( 0, this.width, 0, this.height, -100, 100 );
        this._camera.position.set( 0 , 0, 0);
        this._camera.matrixAutoUpdate = false;
        this._scene.add( this._camera );
    }
 
    resize(): void {
        // update camera size
        this._camera.right = this.width;
        this._camera.bottom = -this.height;
        this._camera.updateMatrix();
         
        // update renderer size
        this.renderer.setSize( this.width, this.height );
    }
 
    render(): void {
        this.renderer.render( this.scene, this._camera );
    }
}