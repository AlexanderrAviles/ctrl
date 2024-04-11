import * as express from 'express';
import {CompanyController} from '../controllers/company.controller';

const Router = express.Router();

Router.get('/company', CompanyController.list);
Router.post('/company', CompanyController.create);

export {Router as companyRouter}