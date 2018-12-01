import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './inventry/inventry.module';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [ 
        TypeOrmModule.forRoot( {
            type: 'sqlite',
            database: 'db/sqlitedb.db',
            synchronize: true,
            entities: [ 'src/inventry/entities/*.entity.ts' ]
        } ), ItemModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
