import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './sample.service';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [ 
        TypeOrmModule.forRoot( {
            type: 'sqlite',
            database: 'db/sqlitedb.db',
            synchronize: true,
            entities: [ 'src/entities/*.entity.ts' ]
        } ), ItemModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
