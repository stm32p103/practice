import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as Services from './services';
import * as Entities from './entities';
import * as Controllers from './controllers';

function ToArray( obj: Object ) {
    return Object.keys( obj ).map( key => obj[key] );
}

@Module( {
    imports: [ TypeOrmModule.forFeature( ToArray( Entities ) ) ],
    providers: ToArray( Services ),
    controllers: ToArray( Controllers ),
} )
export class ItemModule {}