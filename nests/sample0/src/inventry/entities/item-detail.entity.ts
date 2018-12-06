import { LabeledHeader } from './header';
import { Item } from './item.entity';

import { 
    Entity,PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToOne,
    JoinColumn
} from 'typeorm';

@Entity()
export class ItemDetail {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column( { type: 'text', nullable: true } )
    description?: string = 'hello';

    @Column( { nullable: true } )
    fixedAssetId?: string = 'hello2';
    
    @Column( { nullable: true } )
    serialNumber?: string = 'hello3';    
    
    @OneToOne( type => Item, item => item.detail )
    item: Item;
    
    constructor( init?: Partial<ItemDetail> ) {
        Object.assign(this, init);
    }
}
