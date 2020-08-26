import {createConnection, Connection} from "typeorm";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    isActive: boolean;

    constructor( base: Partial<User> = {} ) {
      Object.assign( this, base );
    }
}

( async () => {
  const connection: Connection = await createConnection( {
      type: "sqlite",
      database: "db/sample.sqlite",
      entities: [ User ]
  } );
  await connection.synchronize();

  const sample = new User( {
    firstName: 'sample',
    lastName: 'user',
    isActive: true
  } );

  const userRepo = await connection.getRepository( User );
  await userRepo.save( sample );

  const users = await userRepo.find();
  console.log( JSON.stringify( users, {}, 2 ) );
} )();