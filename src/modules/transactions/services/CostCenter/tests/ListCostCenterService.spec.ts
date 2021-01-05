import AppError from '@shared/errors/AppError';
import FakeCostCentersRepository from '../../../repositories/fakes/FakeCostCentersRepository';
import ListCostCentersService from '../services/ListCostCentersService';

let fakeCostCentersRepository: FakeCostCentersRepository;
let listCostCenter: ListCostCentersService;

describe('ListCostCenter', () => {
  beforeEach(() => {
    fakeCostCentersRepository = new FakeCostCentersRepository();
    listCostCenter = new ListCostCentersService(fakeCostCentersRepository);
  });
  it('should be able to list one user cost centers', async () => {
    const costCenter = await fakeCostCentersRepository.create({
      user_id: 'user',
      name: 'cost center',
    });

    const costCenters = await listCostCenter.execute({ user_id: 'user' });

    expect(costCenters).toEqual([costCenter]);
  });

  it('should not be able to list cost centers when they do not exist', async () => {
    await expect(
      listCostCenter.execute({ user_id: 'user' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
