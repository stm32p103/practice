// ng generate component view/SampleView -m View --export

import { Component, OnInit } from '@angular/core';


interface Rule {
  name: string;
  description: string;
  selected: boolean;
}

function ruleToString( rules: Rule[] ) {
  return rules.map( rule => `${rule.name} ${rule.selected ? '1': '0' } ${rule.description}` ).join('\n');
}

@Component({
  selector: 'app-sample-view',
  templateUrl: './sample-view.component.html',
  styleUrls: ['./sample-view.component.scss']
})
export class SampleViewComponent implements OnInit {
  rules: Rule[] = [
    { name: 'Rule0001', description: 'ルール1', selected: true },
    { name: 'Rule0010', description: 'ルール10', selected: true },
    { name: 'Rule1000', description: 'ルール1000', selected: true },
    { name: 'Rule5000', description: 'ルール5000', selected: true }
  ];
  constructor() { }

  ngOnInit() {
  }

  createText() {
    return ruleToString( this.rules );
  }
}
