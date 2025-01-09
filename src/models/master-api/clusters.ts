import { Type } from 'class-transformer';
import {
    IsDefined,
    IsInt,
    IsPositive,
    IsString,
    IsUrl,
    Length,
    ValidateNested,
} from 'class-validator';

export class Callback {
    @IsDefined()
    @IsUrl({ require_tld: false })
    // @ts-expect-errore enums suck
    url: string;

    @IsDefined()
    @IsString()
    @Length(5, 2000)
    // @ts-expect-errore enums suck
    token: string;
}

export class RegisterClusterRequest {
    @IsDefined()
    @IsInt()
    @IsPositive()
    // @ts-expect-errore enums suck
    shardCount: number;

    @IsDefined()
    @ValidateNested()
    @Type(() => Callback)
    // @ts-expect-errore enums suck
    callback: Callback;
}

export interface RegisterClusterResponse {
    id: string;
}

export interface LoginClusterResponse {
    shardList: number[];
    totalShards: number;
}
