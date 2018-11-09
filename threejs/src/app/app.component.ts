import { Component, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { STOCKS } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    private line: any;
    private svg: any;

    ngAfterViewInit() {
//        this.svg = d3.select('svg').append('g');
//        
//        this.line = d3.line()( STOCKS );
//    
//        this.svg.append('path')
//            .datum( STOCKS )
//            .style("stroke", "gray")
//            .style("fill", "none")
//            .attr('color', 'navy' )
//            .attr('d', this.line );
    }
}
