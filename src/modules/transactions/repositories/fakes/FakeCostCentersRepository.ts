import { v4 } from 'uuid';

import ICreateCostCenterDTO from '@modules/transactions/dtos/ICreateCostCenterDTO';
import IFindByIdDTO from '@modules/transactions/dtos/IFindByIdDTO';
import ICostCentersRepository from '../ICostCentersRepository';
import CostCenter from '../../infra/typeorm/entities/CostCenter';

class FakeCostCentersRepository implements ICostCentersRepository {
  private costCenters: CostCenter[] = [];

  public async create({
    name,
    user_id,
  }: ICreateCostCenterDTO): Promise<CostCenter> {
    const costCenter = new CostCenter();

    Object.assign(costCenter, { id: v4(), name, user_id });

    this.costCenters.push(costCenter);

    return costCenter;
  }

  public async update(cost_center: CostCenter): Promise<CostCenter> {
    const findIndex = this.costCenters.findIndex(
      findCostCenter =>
        findCostCenter.id === cost_center.id &&
        findCostCenter.user_id === cost_center.user_id,
    );

    this.costCenters[findIndex] = cost_center;

    return cost_center;
  }

  public async findByName({
    user_id,
    name,
  }: ICreateCostCenterDTO): Promise<CostCenter | undefined> {
    const costCenter = this.costCenters.find(
      cost_center =>
        cost_center.name === name && cost_center.user_id === user_id,
    );

    return costCenter;
  }

  public async findById({
    user_id,
    id,
  }: IFindByIdDTO): Promise<CostCenter | undefined> {
    const costCenter = this.costCenters.find(
      cost_center => cost_center.id === id && cost_center.user_id === user_id,
    );

    return costCenter;
  }

  public async findAll(user_id: string): Promise<CostCenter[]> {
    const costCenter = this.costCenters.filter(
      costCenters => costCenters.user_id === user_id,
    );

    return costCenter;
  }

  public async delete(cost_center: CostCenter): Promise<void> {
    this.costCenters = this.costCenters.filter(
      keepCostCenter =>
        keepCostCenter.id !== cost_center.id &&
        keepCostCenter.user_id === cost_center.user_id,
    );
  }
}

export default FakeCostCentersRepository;
