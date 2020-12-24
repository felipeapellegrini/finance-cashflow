import { Request, Response } from 'express';
import { container } from 'tsyringe';
import DeleteAccountTypeService from '../../../services/account-type/services/DeleteAccountTypeService';
import UpdateAccountTypeService from '../../../services/account-type/services/UpdateAccountTypeService';
import ListAccountTypesService from '../../../services/account-type/services/ListAccountTypesService';
import CreateAccountTypeService from '../../../services/account-type/services/CreateAccountTypeService';

class AccountTypesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { name } = request.body;

      const createAccountType = container.resolve(CreateAccountTypeService);

      const accountType = await createAccountType.execute({
        user_id,
        name,
      });

      return response.json(accountType);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<any> {
    try {
      const user_id = request.user.id;
      const { id } = request.params;

      const deleteAccountType = container.resolve(DeleteAccountTypeService);

      await deleteAccountType.execute(user_id, id);

      return response.status(204).send();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { id } = request.params;
      const { name } = request.body;

      const updateAccountType = container.resolve(UpdateAccountTypeService);

      const accountType = await updateAccountType.execute({
        user_id,
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
      const user_id = request.user.id;
      const accountTypes = container.resolve(ListAccountTypesService);

      const accountTypesList = await accountTypes.execute(user_id);

      return response.json(accountTypesList);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default AccountTypesController;
