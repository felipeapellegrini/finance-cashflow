import ICreateCostCenterDTO from '../dtos/ICreateCostCenterDTO';
import IFindByIdDTO from '../dtos/IFindByIdDTO';
import CostCenter from '../infra/typeorm/entities/CostCenter';

export default interface ICostCentersRepository {
  create(data: ICreateCostCenterDTO): Promise<CostCenter>;
  update(cost_center: CostCenter): Promise<CostCenter>;
  findByName(data: ICreateCostCenterDTO): Promise<CostCenter | undefined>;
  findById({ user_id, id }: IFindByIdDTO): Promise<CostCenter | undefined>;
  findAll(user_id: string): Promise<CostCenter[] | undefined>;
  delete(cost_center: CostCenter): Promise<void>;
}
