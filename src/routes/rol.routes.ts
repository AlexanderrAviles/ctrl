import * as express from 'express';
import { RolController } from '../controllers/rol.controller';

const Router = express.Router();

Router.get('/rol', RolController.list);
Router.post('/rol', RolController.create);

export {Router as rolRouter}