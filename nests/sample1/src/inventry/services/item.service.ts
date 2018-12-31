import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { ItemDto } from '../dto';
import { Item } from '../entities';

@Injectable()
export class ItemService {
    constructor( 
        @InjectRepository( Item ) private readonly items: Repository<Item>
    ) {}

    async create( dto: ItemDto ): Promise<Item> {
        let newItem = new Item( { ...dto } );
        return await this.items.save( newItem );
    }

    async update( id: number, dto: ItemDto ): Promise<Item> {
        await this.items.update( id, new Item(  { ...dto } ) );
        return await this.items.findOne( id );
    }

    async findOneByCode( code: string ): Promise<Item> {
        return await this.items.findOne( { code: code } );
    }
    
    async findOneById( id: number ): Promise<Item> {
        return await this.items.findOne( id );
    }
    
    async findAll(): Promise<Item[]> {
        return await this.items.find( {} );
    }

    async findByCode( codes: string[] ): Promise<Item[]> {
        return await this.items.find();
    }

    async findByIds( ids: number[] ): Promise<Item[]> {
        return await this.items.findByIds( ids );
    }

    async delete( ids: number[] ): Promise<void> {
        await this.items.delete( ids );
    }
}
