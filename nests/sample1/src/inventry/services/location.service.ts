import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EntityCommonService } from './entity-common.service';
import { LocationDto } from '../dto';
import { Location } from '../entities';

@Injectable()
export class LocationService implements EntityCommonService<Location,LocationDto> {
    constructor( 
        @InjectRepository( Location ) private readonly repo: Repository<Location>
    ) {
    }

    async add( dto: LocationDto ): Promise<Location> {
        let newItem = this.repo.create( dto );
        return await this.repo.save( newItem );
    }

    async update( id: number, dto: LocationDto ): Promise<Location> {
        await this.repo.update( id, new Location(  { ...dto } ) );
        return await this.repo.findOne( id );
    }

    async findOneByCode( code: string ): Promise<Location> {
        return await this.repo.findOne( { code: code } );
    }
    
    async findOneById( id: number ): Promise<Location> {
        return await this.repo.findOne( id );
    }
    
    async findAll(): Promise<Location[]> {
        return await this.repo.find( {} );
    }

    async findByCodes( codes: string[] ): Promise<Location[]> {
        return await this.repo.find();
    }

    async findByIds( ids: number[] ): Promise<Location[]> {
        return await this.repo.findByIds( ids );
    }

    async delete( ids: number[] ): Promise<void> {
        await this.repo.delete( ids );
    }
}