import { Path } from './path';
import { ValueObject } from './core/value-object';

export interface WorkingCopyProps {
  root: string;
  path: Path;
}

export class WorkingCopy extends ValueObject<WorkingCopyProps> {
  static create( props: WorkingCopyProps ) {
    if ( !props.root || !props.path ) {
      // Tentative
      throw new Error( '[WorkingCopy] Invalid parameter.' );
    }

    return new WorkingCopy( props );
  }

  private constructor( props: WorkingCopyProps ) {
    super( props );
  }

  isSameRootOf( wc: WorkingCopy ) {
    return this.root === wc.root;
  }

  get root() { return this.props.root };
  get path() { return this.props.path };
}
