import { Request, Response } from "express";
import { Equal, FindOptionsWhere, ILike, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { RolEntity } from "../entities/rol.entity";
import { RolQueryDto } from "../dtos/rol-query.dto";
import { CreateRolDto } from "../dtos/create-rol.dto";

export class RolController {
  static async list(req: Request, res: Response) {
    try {
      const rolRepository: Repository<RolEntity> =
        AppDataSource.getRepository(RolEntity);
      const queryParams: RolQueryDto = plainToInstance(RolQueryDto, req.query, {
        excludeExtraneousValues: true,
      });
      const validationErrors = await validate(queryParams);
      console.log(queryParams);

      if (validationErrors.length > 0)
        return res.status(400).json(validationErrors);

      /**
       * Lógica de búsqueda por modo query
       */
      const where: FindOptionsWhere<RolEntity> = Object.keys(
        queryParams
      ).reduce((acc, key) => {
        if (queryParams[key]) {
          acc[key] = ILike(`%${queryParams[key]}%`);
        }
        return acc;
      }, {});

      //   if (queryParams.prestador !== undefined)
      //     where["prestador"] = Equal(queryParams.prestador);
      //   if (queryParams.activo !== undefined)
      //     where["activo"] = Equal(queryParams.activo);
      //   if (queryParams.id) where["id"] = Equal(queryParams.id);

      res.status(200).json(await rolRepository.find({ where }));
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const rolRepository: Repository<RolEntity> =
        AppDataSource.getRepository(RolEntity);
      const requestBody = plainToInstance(CreateRolDto, req.body, {
        excludeExtraneousValues: true,
      });
      validate(requestBody).then((errors) => {
        if (errors.length > 0) {
          res.status(400).json(errors);
        }
      });
      const rol: RolEntity = rolRepository.create(requestBody);

      const createdRol = await rolRepository.save(rol);

      res.status(201).json(createdRol);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async update(req: Request, res: Response) {}

  static async delete(req: Request, res: Response) {}
}
