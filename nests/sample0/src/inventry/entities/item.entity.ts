import { LabeledHeader } from './header';
import { Location } from './location.entity';;
import { ItemDetail } from './item-detail.entity';

import { 
    Entity,
    Column,
    OneToOne,
    ManyToOne,
    JoinColumn
} from 'typeorm';

/* ############################################################################
 * 軽量なヘッダ
 * ######################################################################### */
@Entity()
export class Item extends LabeledHeader {
    @Column()
    requirePermissionToMove?: boolean = false;

    @Column( { nullable: true } )
    locationId?: number;
    
    @ManyToOne( type => Location )
    @JoinColumn( { name: 'locationId' } )
    location?: Location;
    
    constructor( init?: Partial<Item> ) {
        super();
        Object.assign(this, init);
    }
    
    isLocatedAt( location: Location ): void {
        this.location = location;
        this.locationId = location.id;
    }

    
    @OneToOne( type => ItemDetail, detail => detail.item, { cascade: true } )
    @JoinColumn()
    detail: ItemDetail;
}
