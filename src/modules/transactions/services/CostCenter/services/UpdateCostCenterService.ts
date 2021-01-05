import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ICostCentersRepository from '../../../repositories/ICostCentersRepository';
import CostCenter from '../../../infra/typeorm/entities/CostCenter';
import { IUpdateCostCenter } from '../../../dtos/HandleCostCentersDTO';

@injectable()
class UpdateCostCenterService {
  constructor(
    @inject('CostCentersRepository')
    private costCentersRepository: ICostCentersRepository,
  ) {}

  public async execute({
    user_id,
    name,
    id,
  }: IUpdateCostCenter): Promise<CostCenter> {
    const costCenter = await this.costCentersRepository.findById({
      user_id,
      id,
    });

    if (!costCenter) {
      throw new AppError('This Cost Center does not exist.');
    }

    const checkName = await this.costCentersRepository.findByName({
      user_id,
      name,
    });

    if (checkName && checkName.id !== id) {
      throw new AppError('This Cost Center name already exists.');
    }

    costCenter.name = name;

    await this.costCentersRepository.update(costCenter);

    return costCenter;
  }
}

export default UpdateCostCenterService;
