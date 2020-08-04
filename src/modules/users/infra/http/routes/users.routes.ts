import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '@modules/users/infra/http/controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);

export default usersRouter;
