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
        { label: 'Test', icon: 'pi pi-pw pi-file-excel', routerLink: 'test' },
        { label: 'Upload', icon: 'pi pi-pw pi-file-excel', routerLink: 'upload' },
        { label: 'Resize', icon: 'pi pi-pw pi-file-excel', routerLink: 'resize' },
        { label: 'Three', icon: 'pi pi-pw pi-file-excel', routerLink: 'three' },
        { label: 'Data', icon: 'pi pi-pw pi-file-excel', routerLink: 'data' }
      ] }
    ];
  }
}
