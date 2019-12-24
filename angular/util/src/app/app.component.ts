import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'util';
  items: MenuItem[] = [];
  
  ngOnInit() {
    this.items = [
      { label: 'Root', items: [
        { label: 'Sample', icon: 'pi pi-pw pi-file-excel', routerLink: 'sample' },
        { label: 'Test', icon: 'pi pi-pw pi-file-excel', routerLink: 'test' }
      ] }
    ];
  }
}
