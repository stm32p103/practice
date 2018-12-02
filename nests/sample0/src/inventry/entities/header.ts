import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Header {
    @PrimaryGeneratedColumn()
    readonly id?: number;

    @CreateDateColumn()
    readonly createdAt?: Date;

    @UpdateDateColumn()
    readonly updatedAt?: Date;
    
    @Column({ length: 64 })
    name: string = '';
}

@Entity()
export class LabeledHeader extends Header {
    @Column( { length: 64 } )
    label: string = '';
}
