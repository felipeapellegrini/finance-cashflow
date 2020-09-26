import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AccountTypesController from '../controllers/AccountTypesController';

const accountTypesRouter = Router();
const accountTypesController = new AccountTypesController();

accountTypesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  accountTypesController.create,
);

accountTypesRouter.delete('/:id', accountTypesController.delete);

export default accountTypesRouter;
