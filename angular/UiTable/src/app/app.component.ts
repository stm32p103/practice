import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { PasteService, ResizeService } from './service';
import { map, flatMap, takeUntil } from 'rxjs/operators';
import { fromEvent } from 'rxjs'
import { createScreen, Picture, CellDrawable, Html2ArrayConverter } from './module';

import * as PIXI from 'pixi.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  converter = new Html2ArrayConverter( new DOMParser() );
  app: PIXI.Application;
  @ViewChild('container') container;
  @ViewChild('image') canvas;
  constructor(private paste: PasteService, private resize: ResizeService) {
    this.paste.getData('text/html').subscribe(data=>{
      const res = this.converter.convert( data );
    } );
  }
  pasted = '';

  ngAfterViewInit() {
    const canvas: HTMLCanvasElement = this.canvas.nativeElement;


    this.app = new PIXI.Application( { view: canvas });
    this.app.renderer.resize( window.innerWidth, innerHeight );

    let graphic = new PIXI.Graphics();
    let text = new PIXI.Text('This is a PixiJS text',{fontFamily : 'MS P Gothic', fontSize: 100, fill : 0xFFFFFF, align : 'center'});

    // 
    graphic.interactive = true;
    const mousedown = fromEvent<PIXI.interaction.InteractionEvent>( graphic, 'mousedown' );
    const mouseup = fromEvent<PIXI.interaction.InteractionEvent>( graphic, 'mouseup' );
    const mousemove = fromEvent<PIXI.interaction.InteractionEvent>( graphic, 'mousemove' );
    
    

    mousedown.pipe( flatMap( e => {
      // マウス座標: ドラッグ対象のオブジェクト基準
      const pc = e.data.getLocalPosition( e.currentTarget );

      return mousemove.pipe( map( e => {
        // マウス座標: ドラッグ対象の親オブジェクト基準
        const p = e.data.getLocalPosition( e.currentTarget.parent );

        e.currentTarget.position.x = p.x - pc.x;
        e.currentTarget.position.y = p.y - pc.y;
      } ), takeUntil( mouseup ) );
    } ) ).subscribe();

    graphic.addChild(text);
    this.app.stage.addChild( graphic);
    // リサイズ
    this.resize.size.pipe( map( s => this.app.renderer.resize( s.w, s.h ) ) );
  }
}

