import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateTransactionService from '@modules/transactions/services/Transaction/services/CreateTransactionService';
import ListTransactionsService from '@modules/transactions/services/Transaction/services/ListTransactionsService';

export default class TransactionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const {
        account_id,
        subcategory_id,
        costcenter_id,
        installment,
        installments,
        transaction_date,
        due_date,
        payment_date,
        total,
        description,
        status,
        type,
      } = request.body;

      const createTransaction = container.resolve(CreateTransactionService);

      const transaction = await createTransaction.execute({
        user_id,
        account_id,
        subcategory_id,
        costcenter_id,
        installment,
        installments,
        transaction_date,
        due_date,
        payment_date,
        total,
        description,
        status,
        type,
      });

      return response.json(transaction);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;

      const listTransactions = container.resolve(ListTransactionsService);

      const transactions = await listTransactions.execute({ user_id });

      return response.json(transactions);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
