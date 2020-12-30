// import AppError from '@shared/errors/AppError';
import FakeCostCentersRepository from '../../../repositories/fakes/FakeCostCentersRepository';
import CreateCostCenterService from '../services/CreateCostCenterService';

let fakeCostCentersRepository: FakeCostCentersRepository;
let createCostCenter: CreateCostCenterService;

describe('CreateCostCenter', () => {
  beforeEach(() => {
    fakeCostCentersRepository = new FakeCostCentersRepository();
    createCostCenter = new CreateCostCenterService(fakeCostCentersRepository);
  });
  it('should be able to create a cost center', async () => {
    const costCenter = await createCostCenter.execute({
      name: 'cost center',
      user_id: 'user',
    });

    expect(costCenter).toHaveProperty('id');
    expect(costCenter.name).toBe('cost center');
  });
});
