import AppError from '@shared/errors/AppError';
import FakeCostCentersRepository from '../../../repositories/fakes/FakeCostCentersRepository';
import DeleteCostCenterService from '../services/DeleteCostCenterService';

let fakeCostCentersRepository: FakeCostCentersRepository;
let deleteCostCenter: DeleteCostCenterService;

describe('DeleteCostCenter', () => {
  beforeEach(() => {
    fakeCostCentersRepository = new FakeCostCentersRepository();
    deleteCostCenter = new DeleteCostCenterService(fakeCostCentersRepository);
  });
  it('should be able to delete a cost center', async () => {
    const costCenter = await fakeCostCentersRepository.create({
      name: 'cost center',
      user_id: 'user',
    });

    await deleteCostCenter.execute({
      user_id: 'user',
      id: costCenter.id,
    });

    const costCenters = await fakeCostCentersRepository.findById({
      user_id: 'user',
      id: costCenter.id,
    });

    expect(costCenters).toBeUndefined();
  });

  it('should not be able to delete a non existing cost center', async () => {
    await expect(
      deleteCostCenter.execute({
        user_id: 'user',
        id: 'non existing cost center',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
