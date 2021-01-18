import { ValueObject } from "./core/value-object";
import { Directory } from "./directory";

export interface PathProps {
  directories: Directory[];
}

export class Path extends ValueObject<PathProps> {
  constructor( props?: PathProps ) {
    super( props ? props : { directories: [] } );
  }

  get directories() {
    return this.props.directories;
  }

  get depth(): number {
    return this.props.directories.length;
  }

  commonDepthOf( path: Path ) {
    const minDepth = Math.min( path.depth, this.depth );
    let commonDepth = 0;

    for ( let depth = 0; depth < minDepth; depth++ ) {
      if ( this.directories[ depth ].equals( path.directories[ depth ] ) ) {
        commonDepth++;
      } else {
        break;
      }
    }

    return commonDepth;
  }

  getSubPath( depth: number ): Path {
    depth = Math.min( Math.max( 0, depth ), this.depth );
    return new Path( { directories: this.directories.slice( 0, depth ) } );
  }

  commonPathOf( path: Path ) {
    return this.getSubPath( this.commonDepthOf( path ) );
  }

  routeTo( path: Path ): Iterable<Path> {
    return new Route( this, path );
  }
}

/**
 * for-of で階層を移動するためクラス
 */
class Route implements Iterable<Path> {
  readonly commonDepth: number;
  private currentDepth: number;

  constructor( private from: Path, private to: Path ) {
    this.commonDepth = from.commonDepthOf( to );
    this.currentDepth = from.depth;
  }

  *[Symbol.iterator](): Iterator<Path> {
    // 上り
    while ( this.currentDepth > this.commonDepth ) {
      yield this.from.getSubPath( this.currentDepth );
      this.currentDepth--;
    }

    // 下り
    while ( this.currentDepth <= this.to.depth ) {
      yield this.to.getSubPath( this.currentDepth );
      this.currentDepth++;
    }
  }
}
