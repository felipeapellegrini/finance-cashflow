import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCostCenterService from '@modules/transactions/services/CostCenter/services/CreateCostCenterService';
import DeleteCostCenterService from '@modules/transactions/services/CostCenter/services/DeleteCostCenterService';
import ListCostCentersService from '@modules/transactions/services/CostCenter/services/ListCostCentersService';
import UpdateCostCenterService from '@modules/transactions/services/CostCenter/services/UpdateCostCenterService';

export default class CostCentersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { name } = request.body;

      const createCostCenter = container.resolve(CreateCostCenterService);

      const costCenter = await createCostCenter.execute({
        user_id,
        name,
      });

      return response.json(costCenter);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { id } = request.params;

      const deleteCostCenter = container.resolve(DeleteCostCenterService);

      await deleteCostCenter.execute({
        user_id,
        id,
      });

      return response.status(204).send();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;

      const listCostCenters = container.resolve(ListCostCentersService);

      const costCenters = await listCostCenters.execute(user_id);

      return response.json(costCenters);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { cost_center_id } = request.params;
      const { cost_center_name } = request.body;

      const updateCostCenter = container.resolve(UpdateCostCenterService);

      const costCenter = await updateCostCenter.execute({
        user_id,
        cost_center_id,
        cost_center_name,
      });

      return response.json(costCenter);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
