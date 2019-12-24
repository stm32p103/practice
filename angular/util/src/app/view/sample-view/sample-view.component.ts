// ng generate component view/SampleView -m View --export

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample-view',
  templateUrl: './sample-view.component.html',
  styleUrls: ['./sample-view.component.scss']
})
export class SampleViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
