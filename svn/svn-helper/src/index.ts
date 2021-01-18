import { Directory } from "./model/directory";
import { Path } from "./model/path";

const x = new Path( { directories: Directory.from( [ 'a', 'b', 'x' ] ) } );
const y = new Path( { directories: Directory.from( [ 'a', 'b', 'y' ] ) } );

for( let p of x.routeTo( y ) ) {
  console.log( p.directories.map( dir => dir.name ) );
}
