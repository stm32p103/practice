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
        let a = await this.itemRepos.create( { name: 'abc', label: 'x' } );
        let items = await this.itemRepos.findAll();
        console.log( items );
        return items;
    }
}
