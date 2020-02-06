import { Component, OnInit, ViewChild } from '@angular/core';
import {  AfterViewInit, ElementRef } from '@angular/core';
import {
    WebGLRenderer,
    Scene,
    OrthographicCamera,SphereBufferGeometry,MeshBasicMaterial,Mesh, Vector3, Line, LineSegments, LineBasicMaterial, Geometry, Vector2,
    Path, BufferGeometry, Raycaster
} from 'three';

import { Sandbox } from './sandbox';

import { fromEvent } from 'rxjs';
import { tap, takeUntil, flatMap } from 'rxjs/operators';

function generate() {
    const material = new LineBasicMaterial( { color: 0xFF0000, opacity: 0.1 } );
    const geometry = new Geometry();
    
    geometry.vertices.push( new Vector3( 0, 0, 0 ) );
    geometry.vertices.push( new Vector3( 100, 40, 0 ) );
    geometry.vertices.push( new Vector3( 100, 40, 0 ) );
    geometry.vertices.push( new Vector3( 200, 200, 0 ) );;
    geometry.vertices.push( new Vector3( 200, 200, 0 ) );
    geometry.vertices.push( new Vector3( 300, 400, 0 ) );
    
    const line = new LineSegments( geometry, material );
    return line;
}

function createPath() {
  const path = new Path();
  
  for( let i=0; i<10000; i++ ) {
    path.lineTo( i/50, 100+100*Math.sin( i * Math.PI / 360 ));
  }
  
  var geometry = new BufferGeometry().setFromPoints( path.getPoints() );
  var material = new LineBasicMaterial( { color: 0xffffff } );

  return new Line( geometry, material );
}

@Component({
  selector: 'app-three-view',
  templateUrl: './three-view.component.html',
  styleUrls: ['./three-view.component.scss']
})
export class ThreeViewComponent implements AfterViewInit {
  private sandbox: Sandbox;
  
  @ViewChild('three', { static: true } ) el: ElementRef<HTMLCanvasElement>;
  constructor() {}

  ngAfterViewInit(): void {
    this.sandbox = new Sandbox( this.el.nativeElement );
    this.sandbox.init();    
       
//    // resize handler
//    window.addEventListener( 'resize', ( event ) => { 
//      this.sandbox.resize();
//      this.sandbox.render();
//    } );
//  
  
  
  // --------------------------------------------------------------------
  // add sphere
  const sphere = new Mesh(
      new SphereBufferGeometry( 100, 32, 8 ),
      new MeshBasicMaterial( { color: 0x0000FF, wireframe: true } )
    );
    this.sandbox.scene.add( sphere );
  const path = createPath();
    
  this.sandbox.scene.add( generate() );
  this.sandbox.scene.add( path );
  
  
  const canvas = this.el.nativeElement;
  const pos = new Vector2();
  const move$ = fromEvent<MouseEvent>( canvas, 'mousemove' );
  const out$ = fromEvent<MouseEvent>( canvas, 'mouseout' );
  const bound = canvas.getBoundingClientRect();
  const ray = new Raycaster();
//  const cam = new OrthographicCamera();
  fromEvent<MouseEvent>( canvas, 'mouseover' )
  .pipe( flatMap( evt => {
    
    return move$.pipe( tap( e => {
      pos.x = ( ( e.clientX - bound.left ) / bound.width ) * 2 - 1;
      pos.y = ( ( e.clientY - bound.left ) / bound.height ) * 2 + 1;
      
    } ),  );
  } ) );
  
    // animate sphere
//    const delta = Math.PI / 360;
//    let i = 0;
//    setInterval( ()=>{
//      sphere.rotateX( delta )
//      i++;
//      this.sandbox.render();
//    }, 10 );
    // --------------------------------------------------------------------
     
    // initial render
    this.sandbox.resize();
    this.sandbox.render();
  }
}

