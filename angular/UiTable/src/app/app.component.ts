import { Component, ViewChild, OnInit } from '@angular/core';
import { PasteService } from './service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('image') canvas;
  constructor(private paste: PasteService) {
    this.paste.getData('text/html').subscribe(data=>console.log(data));
    this.paste.getData('text/plain').subscribe(data=>console.log(data));
  }
  pasted = '';

  onPaste(event: ClipboardEvent) {
  }

  ngOnInit() {
   this.paste.getImages().subscribe(data=>{
      this.canvas.nativeElement.getContext('2d').drawImage(data,0,0);
  });
  }
}
