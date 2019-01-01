import { 
    Entity
} from 'typeorm';

import { EntityCommon } from './common.entity';

@Entity()
export class Location extends EntityCommon {
    constructor( init?: Partial<Location> ) {
        super( init );
    }
}
