import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Get, Post, Body, Controller } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
    constructor( @InjectRepository( Item ) private readonly itemRepos: Repository<Item> ) {
    }

    async add( item: Item ): Promise<Item> {
        let newItem = this.itemRepos.create( item );
        return await this.itemRepos.save(newItem);
    }
    
    async findAll(): Promise<Item[]> {
        return await this.itemRepos.find();
    }
}

@Controller()
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Get('/item')
    findAll():  Promise<Item[]> {
        return this.itemService.add( {id: undefined, name: 'abc', description: 'abcd' } )
        .then( (a) => {
            console.log(a);
            return this.itemService.findAll();
        } ).then( items => {
            console.log( items );
            return items;
         } );
    }
    @Post('/item')
    add(@Body('name') name: string, @Body('description') description: string):  Promise<Item> {
        return this.itemService.add( {id: undefined, name: name, description: description} );
    }
}

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
