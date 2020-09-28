import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ICostCentersRepository from '../repositories/ICostCentersRepository';
import CostCenter from '../infra/typeorm/entities/CostCenter';

interface IRequest {
  user_id: string;
  cost_center_id: string;
  cost_center_name: string;
}

@injectable()
class UpdateCostCenterService {
  constructor(
    @inject('CostCentersRepository')
    private costCentersRepository: ICostCentersRepository,
  ) {}

  public async execute({
    user_id,
    cost_center_name,
    cost_center_id,
  }: IRequest): Promise<CostCenter> {
    const costCenter = await this.costCentersRepository.findById({
      user_id,
      id: cost_center_id,
    });

    if (!costCenter) {
      throw new AppError('This Cost Center does not exist.');
    }

    const checkName = await this.costCentersRepository.findByName({
      user_id,
      name: cost_center_name,
    });

    if (checkName && checkName.id !== cost_center_id) {
      throw new AppError('This Cost Center name already exists.');
    }

    costCenter.name = cost_center_name;

    await this.costCentersRepository.update(costCenter);

    return costCenter;
  }
}

export default UpdateCostCenterService;
