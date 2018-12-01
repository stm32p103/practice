import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Location } from '../entities';

@Injectable()
export class LocationService {
    constructor( @InjectRepository( Location ) private readonly itemRepos: Repository<Location> ) {
    }

    async add( item: Location ): Promise<Location> {
        let newItem = this.itemRepos.create( item );
        return await this.itemRepos.save(newItem);
    }
  
    async findAll(): Promise<Location[]> {
        return await this.itemRepos.find();
    }

    async update( item: Location ): Promise<Location> {
        return await this.itemRepos.save(item);
    }
}
