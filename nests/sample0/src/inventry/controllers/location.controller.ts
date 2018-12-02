import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Get, Post, Body, Controller } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Location } from '../entities';
import { LocationService } from '../services';

@Controller('location')
export class LocationController {
    constructor(private readonly itemRepos: LocationService ) {}

    @Get()
    async findAll():  Promise<Location[]> {
        let a = await this.itemRepos.add( {id: undefined, name: 'abc', label: 'x' } );
        return await this.itemRepos.findAll();
    }
    
    @Post()
    add(@Body('name') name: string ):  Promise<Location> {
        return this.itemRepos.add( {id: undefined, name: name, label: 'x' } );
    }
}
