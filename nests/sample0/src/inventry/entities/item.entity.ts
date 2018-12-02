import { LabeledHeader } from './header';
import { Location } from './location.entity';

import { 
    Entity,
    Column,
    OneToOne,
    ManyToOne,
    JoinColumn
} from 'typeorm';

@Entity()
export class Item extends LabeledHeader {}

@Entity()
export class ItemLocation {
    @Column( { primary: true } )
    readonly id?: number;
    
    @Column()
    locationId?: number;
    
    @Column()
    requirePermissionToMove: boolean = false;

    @ManyToOne(type => Location)
    @JoinColumn( { name: 'locationId' } )
    location?: Location;
    
    @OneToOne( type => Item )
    @JoinColumn( { name: 'id' } )
    header?: Item;
    
    constructor( init?: Partial<ItemLocation> ) {
        Object.assign(this, init);
    }
    
    isLocatedAt( location: Location ): void {
        this.location = location;
        this.locationId = location.id;
    }
}
