import {IsBoolean, IsOptional, IsString, IsUrl, Length} from "class-validator";
import {CompanyEntity} from "../entities/company.entity";
import {Expose, Type} from "class-transformer";

export class CreateCompanyDto implements Partial<CompanyEntity> {
    @IsString()
    @Length(3, 10)
    @Expose()
    rut!: string;

    @IsString()
    @Length(3, 255)
    @Expose()
    razonSocial!: string;

    @IsString()
    @Length(3, 50)
    @Expose()
    nombreCorto!: string;

    @IsString()
    @Length(3, 255)
    @Expose()
    giro!: string;

    @IsString()
    @Length(3, 255)
    @Expose()
    domicilio!: string;

    @IsString()
    @Length(3, 50)
    @Expose()
    comuna!: string;

    @IsString()
    @IsUrl()
    @Length(3, 255)
    @Expose()
    @IsOptional()
    sitioWeb?: string;

    @IsString()
    @Length(3, 255)
    @Expose()
    @IsOptional()
    observaciones?: string;

    @IsBoolean()
    @Type(() => Boolean)
    @Expose()
    prestador!: boolean;
}