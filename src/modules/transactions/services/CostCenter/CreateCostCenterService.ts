import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICostCentersRepository from '../../repositories/ICostCentersRepository';
import CostCenter from '../../infra/typeorm/entities/CostCenter';

interface IRequest {
  user_id: string;
  name: string;
}

@injectable()
class CreateCostCenterService {
  constructor(
    @inject('CostCentersRepository')
    private costCentersRepository: ICostCentersRepository,
  ) {}

  public async execute({ name, user_id }: IRequest): Promise<CostCenter> {
    const checkName = await this.costCentersRepository.findByName({
      user_id,
      name,
    });

    if (checkName) {
      throw new AppError('Cost center already registered.');
    }

    const costCenter = await this.costCentersRepository.create({
      name,
      user_id,
    });

    return costCenter;
  }
}

export default CreateCostCenterService;
