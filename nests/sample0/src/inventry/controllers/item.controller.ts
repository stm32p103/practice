import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Get, Post, Body, Controller } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Item } from '../entities';
import { ItemService } from '../services';

@Controller('item')
export class ItemController {
    constructor(private readonly itemRepos: ItemService ) {}

    @Get()
    async findAll():  Promise<Item[]> {
        let a = await this.itemRepos.add( new Item( { name: 'abc', description: 'abcd', label: 'x' } ) );
        let items = await this.itemRepos.findAll();
        console.log( items );
        return items;
    }
    
    @Get('loc')
    async locatedAt() {
        let items = await this.findAll();
        let item = items[3];
        if( item ) {
            item.locationId = 1; 
        }
        return await this.itemRepos.update(item);
    }
    
    @Post()
    add(@Body('name') name: string, @Body('description') description: string):  Promise<Item> {
        return this.itemRepos.add( new Item( { name: 'abc', description: 'abcd', label: 'x' } ) );
    }
}
