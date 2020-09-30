import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ICostCentersRepository from '../../repositories/ICostCentersRepository';
import CostCenter from '../../infra/typeorm/entities/CostCenter';

@injectable()
class ListCostCentersService {
  constructor(
    @inject('CostCentersRepository')
    private costCentersRepository: ICostCentersRepository,
  ) {}

  public async execute(user_id: string): Promise<CostCenter[] | undefined> {
    const costCenters = await this.costCentersRepository.findAll(user_id);

    if (costCenters?.length === 0) {
      throw new AppError(
        'There is no cost centers registered, please register one.',
      );
    }

    return costCenters;
  }
}

export default ListCostCentersService;
