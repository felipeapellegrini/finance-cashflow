import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ICostCentersRepository from '../../../repositories/ICostCentersRepository';
import { IFindById } from '../../../dtos/HandleCostCentersDTO';

@injectable()
class DeleteCostCenterService {
  constructor(
    @inject('CostCentersRepository')
    private costCentersRepository: ICostCentersRepository,
  ) {}

  public async execute({ user_id, id }: IFindById): Promise<void> {
    const costCenter = await this.costCentersRepository.findById({
      user_id,
      id,
    });

    if (!costCenter) {
      throw new AppError('Cost Center does not exist');
    }

    await this.costCentersRepository.delete(costCenter);
  }
}

export default DeleteCostCenterService;
