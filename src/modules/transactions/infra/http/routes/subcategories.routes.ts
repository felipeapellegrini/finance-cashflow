import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SubcategoriesController from '../controllers/SubcategoriesController';

const subcategoriesRouter = Router();
const subcategoriesController = new SubcategoriesController();

subcategoriesRouter.use(ensureAuthenticated);

subcategoriesRouter.post('/', subcategoriesController.create);
subcategoriesRouter.delete('/:id', subcategoriesController.delete);
subcategoriesRouter.get('/', subcategoriesController.index);
subcategoriesRouter.put('/:id', subcategoriesController.update);

export default subcategoriesRouter;
