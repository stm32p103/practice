import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as Services from './services';
import * as Entities from './entities';
import * as Controllers from './controllers';

function ToArray( obj: Object ) {
    return Object.keys( obj ).map( key => obj[key] );
}

const EntityArray = ToArray( Entities );

@Module( {
    imports: [ TypeOrmModule.forFeature( EntityArray ) ],
    providers: ToArray( Services ),
    controllers: ToArray( Controllers ),
} )
export class InventryModule {
    static readonly Entities = EntityArray;
}

export { Services, Entities, Controllers };
