import { 
    Entity
} from 'typeorm';

import { EntityCommon } from './common.entity';

@Entity()
export class Item extends EntityCommon {
    constructor( init?: Partial<Item> ) {
        super( init );
    }
}
