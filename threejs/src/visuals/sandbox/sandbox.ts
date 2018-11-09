import {
    WebGLRenderer,
    OrthographicCamera,
    SphereBufferGeometry,
    MeshBasicMaterial,
    Mesh,
    Scene,
    PerspectiveCamera,
    Vector3,
    Object3D,
} from 'three';
​
import {
    CameraUtility
} from './camera-utility';

import { MoveObject } from './move-object';
import { MouseEventObserver } from '../modules';

export class Sandbox {
    private renderer: WebGLRenderer;
    private camera: OrthographicCamera;
    private subcamera: PerspectiveCamera;
    private scene: Scene;
    private utility: CameraUtility;

    private event: MouseEventObserver;
    private control: MoveObject;

    constructor( private el: HTMLElement ) {
        this.renderer = new WebGLRenderer();
        this.el.appendChild( this.renderer.domElement );

        // init camera
        this.camera = new OrthographicCamera( 0, 0, 0, 0, -100, 100 );
        this.camera.position.set( 0, 0, 0 );
        this.camera.matrixAutoUpdate = false;
        
        this.subcamera = new PerspectiveCamera( 45, 1, 0, 1000 );
        this.subcamera.position.set( 0,0,-200 );

        // utility
        this.utility = new CameraUtility( this.renderer, this.camera );
        
        // --------------------------------------------------------------------
        this.scene = new Scene();
        this.scene.add( this.camera );
        // add sphere
        let sphere = new Mesh(
            new SphereBufferGeometry( 100, 32, 8 ),
            new MeshBasicMaterial( { color: 0x0000FF, wireframe: true } )
        );
        this.scene.add( sphere );

        // animate sphere
        const delta = Math.PI / 360;
        let i = 0;
        setInterval( ()=>{
            sphere.rotateX( delta )
            i++;
            this.render();
        }, 30 );
        // --------------------------------------------------------------------
        this.event = new MouseEventObserver( this.renderer.domElement );
        this.event.attatch();

        // --------------------------------------------------------------------
        this.control = new MoveObject( this.event, this.camera );
        this.control.control$.subscribe();
    }
    
    resize( width: number, height: number ): void {
        this.utility.sync( width, height );
    }
    
    render(): void {
        this.renderer.render( this.scene, this.camera );
//        this.renderer.render( this.scene, this.subcamera);
    }
    
    init(): void {
        
    }
    
    destroy(): void {
        this.event.detatch();
    }
}