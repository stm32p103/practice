import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Get, Post, Body, Controller } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Item, ItemDetail } from '../entities';
import { ItemService } from '../services';

@Controller('item')
export class ItemController {
    constructor(private readonly itemRepos: ItemService ) {}

    @Get()
    async findAll():  Promise<Item[]> {
        let a = await this.itemRepos.create( new Item( { name: 'abc', label: 'x', detail: new ItemDetail( { description: 'hi'} ) } ) );
        let items = await this.itemRepos.findAll();
        return items;
    }
    @Get('aaa')
    async test(): Promise<Item> {
        let items = await this.itemRepos.findAll();
        console.log( items[0] )
        items[0].locationId = 2;
        return await this.itemRepos.update( items[0] );
    }
    
    @Get('detail')
    async detail(): Promise<ItemDetail[]>{
        return await this.itemRepos.detail();
    }
}
