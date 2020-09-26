import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAccountTypeService from '@modules/accounts/services/CreateAccountTypeService';
import DeleteAccountTypeService from '@modules/accounts/services/DeleteAccountTypeService';

class AccountTypesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name } = request.body;

      const createAccountType = container.resolve(CreateAccountTypeService);

      const accountType = await createAccountType.execute(name);

      return response.json(accountType);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<any> {
    try {
      const { id } = request.params;

      const deleteAccountType = container.resolve(DeleteAccountTypeService);

      await deleteAccountType.execute(id);

      return response.status(204).send();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default AccountTypesController;
