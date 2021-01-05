import {
  ICreateCostCenter,
  IFindAll,
  IFindById,
} from '../dtos/HandleCostCentersDTO';
import CostCenter from '../infra/typeorm/entities/CostCenter';

export default interface ICostCentersRepository {
  create({ user_id, name }: ICreateCostCenter): Promise<CostCenter>;
  update(cost_center: CostCenter): Promise<CostCenter>;
  findByName({
    user_id,
    name,
  }: ICreateCostCenter): Promise<CostCenter | undefined>;
  findById({ user_id, id }: IFindById): Promise<CostCenter | undefined>;
  findAll({ user_id }: IFindAll): Promise<CostCenter[] | undefined>;
  delete(cost_center: CostCenter): Promise<void>;
}
