import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateAccountService from '../../../services/account/services/UpdateAccountService';
import ListAccountsService from '../../../services/account/services/ListAccountsService';
import CreateAccountService from '../../../services/account/services/CreateAccountService';

class AccountsController {
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
      const { name, account_type } = request.body;

      const updateAccount = container.resolve(UpdateAccountService);

      const account = await updateAccount.execute({
        id,
        name,
        user_id,
        account_type,
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

      const accountsList = await accounts.execute({ user_id });

      return response.json(accountsList);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default AccountsController;
