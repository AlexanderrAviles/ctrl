import {CompanyEntity} from "../entities/company.entity";
import {IsBoolean, IsNumber, IsOptional, IsString, Length} from "class-validator";
import {Expose, Transform, Type} from "class-transformer";

export class CompanyQueryDto implements Partial<CompanyEntity> {
    @IsNumber()
    @Expose()
    @Type(() => Number)
    @IsOptional()
    id?: number;

    @IsString()
    @Length(3, 10)
    @Expose()
    @IsOptional()
    rut?: string;

    @IsString()
    @Length(3, 255)
    @Expose()
    @IsOptional()
    razonSocial?: string;

    @IsString()
    @Length(3, 50)
    @Expose()
    @IsOptional()
    nombreCorto?: string;

    @IsString()
    @Length(3, 255)
    @Expose()
    @IsOptional()
    giro?: string;

    @IsString()
    @Length(3, 50)
    @Expose()
    @IsOptional()
    comuna?: string;

    @IsBoolean()
    @Transform(({value}) => value === undefined ? undefined : value === 'true')
    @Expose()
    @IsOptional()
    prestador?: boolean;

    @IsBoolean()
    @Transform(({value}) => value === undefined ? undefined : value === 'true')
    @Expose()
    @IsOptional()
    activo?: boolean;
}