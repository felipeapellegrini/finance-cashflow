import AppError from '@shared/errors/AppError';
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
      name: 'new cost center',
      id: costCenter.id,
    });

    expect(changedCostCenter.id).toBe(costCenter.id);
    expect(changedCostCenter.name).toBe('new cost center');
  });

  it('should not be able to update a non existing cost center', async () => {
    await expect(
      updateCostCenter.execute({
        user_id: 'user',
        name: 'new name',
        id: 'non existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to set new cost center name to a existing one', async () => {
    await fakeCostCentersRepository.create({
      name: 'cost center',
      user_id: 'user',
    });

    const costCenter2 = await fakeCostCentersRepository.create({
      name: 'cost center 2',
      user_id: 'user',
    });

    await expect(
      updateCostCenter.execute({
        user_id: 'user',
        id: costCenter2.id,
        name: 'cost center',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
