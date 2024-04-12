import { IsNumber, IsOptional, IsString, Length } from "class-validator";
import { Expose,  Type } from "class-transformer";
import { RolEntity } from "../entities/rol.entity";

export class RolQueryDto implements Partial<RolEntity> {
  @IsNumber()
  @Expose()
  @Type(() => Number)
  @IsOptional()
  id?: number;

  @IsString()
  @Length(3, 50)
  @Expose()
  @IsOptional()
  nombre?: string;
}
