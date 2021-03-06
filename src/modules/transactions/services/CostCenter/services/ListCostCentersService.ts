import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ICostCentersRepository from '../../../repositories/ICostCentersRepository';
import CostCenter from '../../../infra/typeorm/entities/CostCenter';
import { IFindAll } from '../../../dtos/HandleCostCentersDTO';

@injectable()
class ListCostCentersService {
  constructor(
    @inject('CostCentersRepository')
    private costCentersRepository: ICostCentersRepository,
  ) {}

  public async execute({
    user_id,
  }: IFindAll): Promise<CostCenter[] | undefined> {
    const costCenters = await this.costCentersRepository.findAll({ user_id });

    if (!costCenters || costCenters.length === 0) {
      throw new AppError(
        'There is no cost centers registered, please register one.',
      );
    }

    return costCenters;
  }
}

export default ListCostCentersService;
