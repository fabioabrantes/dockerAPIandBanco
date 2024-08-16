import { Router } from 'express';

import RegisterUserController from '../controllers/regiterUserController';
import FindAllUsersController from '../controllers/findAllUsersController';
import DeleteUserController from '../controllers/deleteUserConntroller';
import UpdatedUserController from '../controllers/UpdatedUserController';

// midleware
import AuthenticateController from '../controllers/AuthenticateController';
import { verifyToken } from '../middlewares/verifyToken';

const routesUser = Router();

routesUser.post('/login', AuthenticateController.handle);
routesUser.post('/users', RegisterUserController.handle);
routesUser.get('/users', FindAllUsersController.handle);
routesUser.put('/users/:id', verifyToken, UpdatedUserController.handle);

routesUser.delete('/users', verifyToken, DeleteUserController.handle);

export { routesUser }