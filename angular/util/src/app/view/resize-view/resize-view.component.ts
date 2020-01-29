import { Component, OnInit, OnDestroy, EventEmitter, ComponentFactoryResolver, ViewContainerRef, Input, ComponentRef, Output, ViewChild, Directive } from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';
import { take, takeUntil }from 'rxjs/operators';


interface SampleData {
  coord: { x: number, y: number };
  value: number;
}

import { get, set } from 'lodash';

@Component({
  selector: 'cell',
  template: `<input [value]="get()" (onValueChange)="set($event)" (input)="set($event.target.value)"/>`
})
export class CellComponent {
  @Input() data: any;
  @Input() binding: string;
  get() {
    return get( this.data, this.binding );
  }
  
  set( value: number ) {
    console.log( value );
    set( this.data, this.binding, value );
  }
}

@Directive({
  selector: '[counter-host]'
})
export class CounterHostDirective {
  constructor( public readonly containerRef: ViewContainerRef ) {}
}

@Component({
  selector: 'counter-container',
  template: `<counter [value]="get()" (valueChange)="set($event)"></counter>`
})
export class CounterContainerComponent {
  @Input() data: any;
  @Input() binding: string;
  get() {
    return get( this.data, this.binding );
  }
  
  set( value: number ) {
    set( this.data, this.binding, value );
    console.log( this.data );
  }
}

@Component({
  selector: 'counter',
  template: `
    <div style="margin: 1em; padding: 1em; border: 1px solid #F00;">
      <button (click)="increment()">+</button>
      <button (click)="decrement()">-</button>
      <button (click)="close()">x</button><p>{{value}}</p>
    </div>`
})
export class CounterComponent implements OnInit, OnDestroy {
  @Input() value: number;
  @Input() format: number;
  @Output() valueChange = new EventEmitter<number>();
  @Output() onClose = new EventEmitter<void>();

  public ngOnInit(): void {
    console.log(`ngOnInit: ${this.value}`);
  }

  public ngOnDestroy(): void {
    this.valueChange.complete();
    this.onClose.complete();
    console.log(`ngOnDestroy: ${this.value}`);
  }
  
  private increment(): void {
    this.valueChange.emit( ++this.value );
  }
  
  private decrement(): void {
    this.valueChange.emit( --this.value );
  }
  
  private close(): void {
    this.onClose.emit();
  }
}
@Component({
  selector: 'app-resize',
  templateUrl: './resize-view.component.html',
  styleUrls: ['./resize-view.component.scss']
})
export class ResizeViewComponent implements OnInit {
  common: any;
  blue: any;
  red: any;
  parentValue = 0;
  
  values: { [index:number]: number } = {};
  
  
  readonly data: SampleData[] = [
    { coord: { x: 1, y: 10 }, value: 100 },
    { coord: { x: 2, y: 20 }, value: 200 },
    { coord: { x: 3, y: 30 }, value: 300 },
    { coord: { x: 4, y: 40 }, value: 400 }
  ];
  readonly bindings = [ 'coord.x', 'coord.y', 'value' ];
  index: number = 0;
  binding: string;
  
  changeBinding() {
    this.binding = this.bindings[ this.index % this.bindings.length ];
    this.index++;
  }
  
  //  @ViewChild(CounterHostDirective, {static: true}) host: CounterHostDirective;
  @ViewChild('host', { read: ViewContainerRef, static: true } ) hostRef: ViewContainerRef;
  constructor( private componentFactoryResolver: ComponentFactoryResolver ) {
    this.common={
      'width.px': 100,
      'height.px': 100
    }
    this.blue= { ...this.common,
      'left.px': 500,
      'top.px': 100
    }
    this.red={ ...this.common,
      'left.px': 500,
      'top.px': 400
    }
    
    this.changeBinding();
  }
  
  generate() {
    const factory = this.componentFactoryResolver.resolveComponentFactory( CounterComponent );
    const component = this.hostRef.createComponent( factory );
    
    const value = Math.round( 100 * Math.random() );
    const index = this.index;
    
    this.values[ this.index ] = value;
    this.index++;
   
    // bind
    component.instance.value = value;
    component.instance.valueChange.subscribe( ( value: number ) => { this.values[ index ] = value } );
    component.instance.onClose.subscribe( () => {
      delete this.values[ index ];
      component.destroy();
    }, ()=>{}, ()=>console.log('destoryed!!') );
    
  }
  
  close() {
    console.log( 'close button clicked.' );
  }

  ngOnInit() {
  }
}
