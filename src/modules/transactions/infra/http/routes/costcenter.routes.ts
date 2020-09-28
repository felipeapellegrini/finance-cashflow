import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CostCentersController from '../controllers/CostCentersController';

const costCentersRouter = Router();
const costCentersController = new CostCentersController();

costCentersRouter.use(ensureAuthenticated);

costCentersRouter.post('/', costCentersController.create);
costCentersRouter.delete('/:id', costCentersController.delete);
costCentersRouter.get('/', costCentersController.index);
costCentersRouter.put('/:cost_center_id', costCentersController.update);

export default costCentersRouter;
