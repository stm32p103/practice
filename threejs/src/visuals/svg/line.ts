import * as d3 from 'd3';

export const data: [number,number][] = [
       [0, 80],
       [100, 100],
       [200, 30],
       [300, 50],
       [400, 40],
       [500, 80]
 ];

export interface LineData {
    color: string;
    data: [ number, number ][];
}

const sample: LineData = {
    color: 'navy',
    data: data
}

export class D3JSLine {
    private line: any;
    private svg: any;
    private path: any;
    constructor( el: any ) {
        this.svg = d3.select( el );
        this.line = d3.line().x( d => d[0] ).y( d => d[0] );
        
        this.path = this.svg.enter()
        .append( 'path' )
        .style("stroke", "gray")
        .style("fill", "none")
        .attr('color', 'navy' )
        .attr('d', this.line )
        .exit()
        .remove();
    }
    
    update( data: [number,number][] ) {
        this.path.datum( data )
        .style("stroke", "gray")
        .style("fill", "none")
        .attr('color', 'navy' )
        .attr('d', this.line );
    }
}
