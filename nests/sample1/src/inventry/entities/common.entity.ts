import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class EntityCommon {
    @PrimaryGeneratedColumn()
    readonly id?: number;
    
    @CreateDateColumn()
    readonly createdAt?: Date;

    @UpdateDateColumn()
    readonly updatedAt?: Date;

    @Column( { length: 128 } )
    code: string = '';
    
    @Column( { length: 128 } )
    name: string = '';

    constructor( init?: Partial<EntityCommon> ) {
        Object.assign( this, init );
    }
}
