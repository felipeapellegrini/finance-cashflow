import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AccountTypesController from '../controllers/AccountTypesController';
import AccountsController from '../controllers/AccountsController';

const accountsRouter = Router();
const accountsController = new AccountsController();
const accountTypesController = new AccountTypesController();

accountsRouter.use(ensureAuthenticated);

accountsRouter.get('/', accountsController.index);

accountsRouter.post('/', accountsController.create);

accountsRouter.put('/:id', accountsController.update);

accountsRouter.post(
  '/types',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  accountTypesController.create,
);

accountsRouter.delete('/types/:id', accountTypesController.delete);

accountsRouter.put('/types/:id', accountTypesController.update);

accountsRouter.get('/types', accountTypesController.index);

export default accountsRouter;
