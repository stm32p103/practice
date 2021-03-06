import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Get, Post, Patch, Delete, Body, Controller, Param, HttpException, HttpStatus } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemDto } from '../dto';
import { Item } from '../entities';
import { ItemService } from '../services';

@Controller('items')
export class ItemController {
    constructor(private readonly items: ItemService ) {}

    @Get()
    async findAll():  Promise<Item[]> {
        return await this.items.findAll();
    }

    @Post()
    async create( @Body() dto: ItemDto ): Promise<Item> {
        return this.items.add( dto );
    }

    @Get(':id')
    async getById( @Param('id') id: number ):  Promise<Item> {
        let found = await this.items.findOneById( id );
        if( found ) {
            return found;
        }
        throw new HttpException( 'Not Found', HttpStatus.NOT_FOUND );
    }
    
    @Patch(':id')
    async update( @Param('id') idString: string, @Body() dto: ItemDto ): Promise<Item> {
        let result = await this.items.update( Number( idString ), dto );
        if( result ) {
            return result;
        }
        throw new HttpException( 'Not Found', HttpStatus.NOT_FOUND );
    }

    @Delete(':id')
    async delete( @Param('id') idString: string ): Promise<void> {
        let id = Number( idString );
        return await this.items.delete( [ id ] );
    }
}
