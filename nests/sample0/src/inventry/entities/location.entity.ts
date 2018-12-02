import { LabeledHeader } from './header';
import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';

@Entity()
export class Location extends LabeledHeader {
    constructor( init?: Partial<Location> ) {
        super();
        Object.assign(this, init);
    }
}
