import { EntityCommonDto } from '../dto';
import { EntityCommon } from '../entities';

export interface EntityCommonService<ENTITY extends EntityCommon, DTO extends EntityCommonDto> {
    add( dto: DTO ): Promise<ENTITY>;
    update( id: number, dto: DTO ): Promise<ENTITY>;
    findOneByCode( code: string ): Promise<ENTITY>;
    findOneById( id: number ): Promise<ENTITY>;
    findByCodes( codes: string[] ): Promise<ENTITY[]>;
    findByIds( ids: number[] ): Promise<ENTITY[]>;
    findAll(): Promise<ENTITY[]>;
    delete( ids: number[] ): Promise<void>;
}
