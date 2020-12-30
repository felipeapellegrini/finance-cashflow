// import AppError from '@shared/errors/AppError';
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

    const costCenters = await listCostCenter.execute('user');

    expect(costCenters).toEqual([costCenter]);
  });
});
