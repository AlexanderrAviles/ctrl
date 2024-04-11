import {Request, Response} from "express";
import {Equal, FindOptionsWhere, ILike, Repository} from "typeorm";
import {CompanyEntity} from "../entities/company.entity";
import {AppDataSource} from "../data-source";
import {plainToInstance} from "class-transformer";
import {CreateCompanyDto} from "../dtos/create-company.dto";
import {validate} from "class-validator";
import {CompanyQueryDto} from "../dtos/company-query.dto";

export class CompanyController {

    static async list(req: Request, res: Response) {
        try {
            const companyRepository: Repository<CompanyEntity> = AppDataSource.getRepository(CompanyEntity);
            const queryParams: CompanyQueryDto = plainToInstance(CompanyQueryDto, req.query, {excludeExtraneousValues: true});
            const validationErrors = await validate(queryParams);
            console.log(queryParams);

            if (validationErrors.length > 0)
                return res.status(400).json(validationErrors);

            /**
             * Lógica de búsqueda por modo query
             */
            const where: FindOptionsWhere<CompanyEntity> = Object.keys(queryParams).reduce((acc, key) => {
                if (queryParams[key]) {
                    acc[key] = ILike(`%${queryParams[key]}%`);
                }
                return acc;
            }, {});

            if (queryParams.prestador !== undefined) where['prestador'] = Equal(queryParams.prestador);
            if (queryParams.activo !== undefined) where['activo'] = Equal(queryParams.activo);
            if (queryParams.id) where['id'] = Equal(queryParams.id);

            res.status(200).json(await companyRepository.find({where}));
        } catch (error) {
            res.status(500).json({message: "Internal server error"});
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const companyRepository: Repository<CompanyEntity> = AppDataSource.getRepository(CompanyEntity);
            const requestBody = plainToInstance(CreateCompanyDto, req.body, {excludeExtraneousValues: true});
            validate(requestBody).then(errors => {
                if (errors.length > 0) {
                    res.status(400).json(errors);
                }
            });
            const company: CompanyEntity = companyRepository.create(requestBody);

            const createdCompany = await companyRepository.save(company);

            res.status(201).json(createdCompany);
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Internal server error"});
        }
    }

    static async update(req: Request, res: Response) {
    }

    static async delete(req: Request, res: Response) {
    }
}