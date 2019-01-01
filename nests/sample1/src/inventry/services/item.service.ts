import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { EntityCommonService } from './entity-common.service';
import { ItemDto } from '../dto';
import { Item } from '../entities';

@Injectable()
export class ItemService implements EntityCommonService<Item,ItemDto> {
    constructor( 
        @InjectRepository( Item ) private readonly repo: Repository<Item>
    ) {
    }

    async add( dto: ItemDto ): Promise<Item> {
        let newItem = this.repo.create( dto );
        return await this.repo.save( newItem );
    }

    async update( id: number, dto: ItemDto ): Promise<Item> {
        await this.repo.update( id, new Item(  { ...dto } ) );
        return await this.repo.findOne( id );
    }

    async findOneByCode( code: string ): Promise<Item> {
        return await this.repo.findOne( { code: code } );
    }
    
    async findOneById( id: number ): Promise<Item> {
        return await this.repo.findOne( id );
    }
    
    async findAll(): Promise<Item[]> {
        return await this.repo.find( {} );
    }

    async findByCodes( codes: string[] ): Promise<Item[]> {
        return await this.repo.find();
    }

    async findByIds( ids: number[] ): Promise<Item[]> {
        return await this.repo.findByIds( ids );
    }

    async delete( ids: number[] ): Promise<void> {
        await this.repo.delete( ids );
    }
}
