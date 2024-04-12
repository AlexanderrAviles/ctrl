import { IsString, Length } from "class-validator";
import { Expose, Type } from "class-transformer";
import { RolEntity } from "../entities/rol.entity";

export class CreateRolDto implements Partial<RolEntity> {
  @IsString()
  @Length(3, 50)
  @Expose()
  nombre!: string;
}
