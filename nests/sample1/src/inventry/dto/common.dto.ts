import { ApiModelProperty } from '@nestjs/swagger';

export class EntityCommonDto {
    @ApiModelProperty( {
        required: false
    } )
    readonly code?: string;

    @ApiModelProperty( {
        required: false
    } )
    readonly name?: string;
}
