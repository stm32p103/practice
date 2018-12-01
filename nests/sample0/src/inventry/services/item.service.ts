import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Item } from '../entities/item.entity';

@Injectable()
export class ItemService {
    constructor( @InjectRepository( Item ) private readonly itemRepos: Repository<Item> ) {
    }

    async add( item: Item ): Promise<Item> {
        let newItem = this.itemRepos.create( item );
        return await this.itemRepos.save(newItem);
    }
  
    async findAll(): Promise<Item[]> {
        return await this.itemRepos.find();
    }

    async update( item: Item ): Promise<Item> {
        return await this.itemRepos.save(item);
    }
}
