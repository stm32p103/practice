import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Get, Post, Patch, Delete, Body, Controller, Param, HttpException, HttpStatus } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocationDto } from '../dto';
import { Location } from '../entities';
import { LocationService } from '../services';

@Controller('location')
export class LocationController {
    constructor(private readonly items: LocationService ) {}

    @Get()
    async findAll():  Promise<Location[]> {
        return await this.items.findAll();
    }

    @Post()
    async create( @Body() dto: LocationDto ): Promise<Location> {
        return this.items.add( dto );
    }

    @Get(':id')
    async getById( @Param('id') id: number ):  Promise<Location> {
        let found = await this.items.findOneById( id );
        if( found ) {
            return found;
        }
        throw new HttpException( 'Not Found', HttpStatus.NOT_FOUND );
    }
    
    @Patch(':id')
    async update( @Param('id') idString: string, @Body() dto: LocationDto ): Promise<Location> {
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
