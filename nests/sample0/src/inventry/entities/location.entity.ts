import { LabeledObject } from './labeled-object.entity';
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
export class Location extends LabeledObject {
    constructor( init?: Partial<Location> ) {
        super();
        Object.assign(this, init);
    }
}
