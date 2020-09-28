import ICreateCostCenterDTO from '@modules/transactions/dtos/ICreateCostCenterDTO';
import IFindByIdDTO from '@modules/transactions/dtos/IFindByIdDTO';
import { Repository, getRepository } from 'typeorm';
import ICostCentersRepository from '../../../repositories/ICostCentersRepository';
import CostCenter from '../entities/CostCenter';

class CostCentersRepository implements ICostCentersRepository {
  private ormRepository: Repository<CostCenter>;

  constructor() {
    this.ormRepository = getRepository(CostCenter);
  }

  public async create({
    name,
    user_id,
  }: ICreateCostCenterDTO): Promise<CostCenter> {
    const costCenter = this.ormRepository.create({
      name,
      user_id,
    });

    await this.ormRepository.save(costCenter);

    return costCenter;
  }

  public async update(cost_center: CostCenter): Promise<CostCenter> {
    return this.ormRepository.save(cost_center);
  }

  public async findByName({
    user_id,
    name,
  }: ICreateCostCenterDTO): Promise<CostCenter | undefined> {
    const costCenter = await this.ormRepository.findOne({
      where: {
        user_id,
        name,
      },
    });

    return costCenter;
  }

  public async findById({
    user_id,
    id,
  }: IFindByIdDTO): Promise<CostCenter | undefined> {
    const costCenter = await this.ormRepository.findOne({
      where: {
        user_id,
        id,
      },
    });

    return costCenter;
  }

  public async findAll(user_id: string): Promise<CostCenter[]> {
    const costCenters = this.ormRepository.find({
      where: {
        user_id,
      },
    });

    return costCenters;
  }

  public async delete(cost_center: CostCenter): Promise<void> {
    await this.ormRepository.remove(cost_center);
  }
}

export default CostCentersRepository;
