import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAccountTypeService from '@modules/accounts/services/CreateAccountTypeService';
import DeleteAccountTypeService from '@modules/accounts/services/DeleteAccountTypeService';
import UpdateAccountTypeService from '@modules/accounts/services/UpdateAccountTypeService';
import ListAccountTypesService from '@modules/accounts/services/ListAccountTypesService';

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

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { name } = request.body;

      const updateAccountType = container.resolve(UpdateAccountTypeService);

      const accountType = await updateAccountType.execute({
        id,
        new_name: name,
      });

      return response.json(accountType);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const accountTypes = container.resolve(ListAccountTypesService);

      const accountTypesList = await accountTypes.execute();

      return response.json(accountTypesList);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default AccountTypesController;
