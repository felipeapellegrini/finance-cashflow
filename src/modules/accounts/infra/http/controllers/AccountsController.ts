import CreateAccountService from '@modules/accounts/services/CreateAccountService';
import UpdateAccountService from '@modules/accounts/services/UpdateAccountService';
import ListAccountsService from '@modules/accounts/services/ListAccountsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class AccountTypesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { name, account_type } = request.body;

      const createAccount = container.resolve(CreateAccountService);

      const account = await createAccount.execute({
        user_id,
        name,
        account_type,
      });

      return response.json(account);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { id } = request.params;
      const { name, type_name } = request.body;

      const updateAccount = container.resolve(UpdateAccountService);

      const account = await updateAccount.execute({
        id,
        name,
        user_id,
        type_name,
      });

      return response.json(account);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;

      const accounts = container.resolve(ListAccountsService);

      const accountsList = await accounts.execute(user_id);

      return response.json(accountsList);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default AccountTypesController;
