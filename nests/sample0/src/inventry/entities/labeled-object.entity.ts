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
export class LabeledObject {
    @PrimaryGeneratedColumn()
    readonly id?: number;

    @Column({ length: 100 })
    label: string = '';

    @Column({ length: 100 })
    name: string = '';

    @Column('text')
    description: string = '';
    
    @CreateDateColumn()
    readonly createdAt?: Date;

    @UpdateDateColumn()
    readonly updatedAt?: Date;
}
