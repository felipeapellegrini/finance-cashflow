import { v4 } from 'uuid';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../ITransactionsRepository';
import { ICreateTransactionDTO } from '../../dtos/ITransactionsDTOS';

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
    });

    this.transactions.push(transaction);

    return transaction;
  }
}
