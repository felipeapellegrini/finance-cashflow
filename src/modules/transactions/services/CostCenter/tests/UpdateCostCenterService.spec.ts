// import AppError from '@shared/errors/AppError';
import FakeCostCentersRepository from '../../../repositories/fakes/FakeCostCentersRepository';
import UpdateCostCenterService from '../services/UpdateCostCenterService';

let fakeCostCentersRepository: FakeCostCentersRepository;
let updateCostCenter: UpdateCostCenterService;

describe('UpdateCostCenter', () => {
  beforeEach(() => {
    fakeCostCentersRepository = new FakeCostCentersRepository();
    updateCostCenter = new UpdateCostCenterService(fakeCostCentersRepository);
  });
  it('should be able to update a cost center', async () => {
    const costCenter = await fakeCostCentersRepository.create({
      name: 'cost center',
      user_id: 'user',
    });

    const changedCostCenter = await updateCostCenter.execute({
      user_id: 'user',
      cost_center_name: 'new cost center',
      cost_center_id: costCenter.id,
    });

    expect(changedCostCenter.id).toBe(costCenter.id);
    expect(changedCostCenter.name).toBe('new cost center');
  });
});
