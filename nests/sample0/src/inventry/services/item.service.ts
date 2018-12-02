import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, BaseEntity } from 'typeorm';

import { Item } from '../entities';

@Injectable()
export class ItemService {
    constructor( @InjectRepository( Item ) private readonly itemRepos: Repository<Item> ) {}

    async create( item: Item ): Promise<Item> {
        let newItem = this.itemRepos.create( item );
        return await this.itemRepos.save( newItem );
    }
    
    async findAll(): Promise<Item[]> {
        return await this.itemRepos.find();
    }

    async findById( id: number ): Promise<Item> {
        return await this.itemRepos.findByIds( [ id ] )[0];
    }
}
