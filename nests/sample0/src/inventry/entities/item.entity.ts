import { LabeledObject } from './labeled-object.entity';
import { Location } from './location.entity';
import { 
    Entity,
    Column,
    ManyToOne,
    JoinColumn
} from 'typeorm';

@Entity()
export class Item extends LabeledObject {
    @Column({nullable: true})
    locationId?: number;

    @ManyToOne(type => Location)
    @JoinColumn( { name: 'locationId' } )
    readonly location?: Location;
    
    constructor( init?: Partial<Item> ) {
        super();
        Object.assign(this, init);
    }
}
