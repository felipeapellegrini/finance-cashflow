import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AccountTypesController from '../controllers/AccountTypesController';

const accountTypesRouter = Router();
const accountTypesController = new AccountTypesController();

accountTypesRouter.use(ensureAuthenticated);

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
