import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { PasteService, ResizeService } from './service';
import { map } from 'rxjs/operators';
import { createScreen, Picture, CellDrawable } from './module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('image') canvas;
  constructor(private paste: PasteService, private resize: ResizeService) {
    this.paste.getData('text/html').subscribe(data=>console.log(data));
    this.paste.getData('text/plain').subscribe(data=>console.log(data));

  }
  pasted = '';

  ngAfterViewInit() {
    const canvas: HTMLCanvasElement = this.canvas.nativeElement;

    const screen = createScreen(canvas);
    const p = screen.create('i.j');
    
    screen.resize( window.innerWidth, window.innerHeight);

    p.draw( new CellDrawable() );
    this.resize.getSize().pipe( map( size => {
      screen.resize( size.w, size.h);
    } ) ).subscribe();

 

    this.paste.getImage().subscribe(data=>{
    });
  }
}
