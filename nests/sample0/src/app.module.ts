import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventryModule } from './inventry/inventry.module';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [ 
        TypeOrmModule.forRoot( {
            type: 'sqlite',
            database: 'db/sqlitedb.db',
            synchronize: true,
            entities: [ ...InventryModule.Entities ]
        } ), InventryModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
