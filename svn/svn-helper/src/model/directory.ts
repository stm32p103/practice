import { ValueObject } from "./core/value-object";

export interface DirectoryProps {
  name: string;
}

export class Directory extends ValueObject<DirectoryProps> {
  static create( props: DirectoryProps ) {
    if ( !props || !props.name ) {
      throw new Error( 'Directory name must not be empty.' );
    }

    return new Directory( props );
  }

  static from( names: string[] ) {
    return names.map( name => Directory.create( { name: name } ) );
  }

  private constructor( props: DirectoryProps ) {
    super( props );
  }

  get name() {
    return this.props.name;
  }
}
