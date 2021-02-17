import { v4 } from 'uuid';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../ITransactionsRepository';
import { ICreateTransactionDTO } from '../../dtos/HandleTransactionsDTO';

export default class TransactionsRepository implements ITransactionsRepository {
  private transactions: Transaction[] = [];

  public async create({
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
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = new Transaction();

    Object.assign(transaction, {
      id: v4(),
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
    });

    this.transactions.push(transaction);

    return transaction;
  }
}
