import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, BaseEntity } from 'typeorm';

import { Item, Location, ItemDetail } from '../entities';

@Injectable()
export class ItemService {
    constructor( 
            @InjectRepository( Item ) private readonly itemRepo: Repository<Item>,
            @InjectRepository( ItemDetail ) private readonly details: Repository<ItemDetail>
    ) {}

    async create( item: Item ): Promise<Item> {
        let newItem = this.itemRepo.create( item );
        await this.itemRepo.save( newItem );

        return await this.itemRepo.save( newItem );
    }

    async findAll(): Promise<Item[]> {
        return await this.itemRepo.find( { relations: [ 'location', 'detail' ] } );
    }

    async detail(): Promise<ItemDetail[]> {
        return await this.details.find( { relations: [ 'item', 'item.location' ] } );
    }

    async update( item: Item ): Promise<Item> {
        return await this.itemRepo.save( item );
    }
}

