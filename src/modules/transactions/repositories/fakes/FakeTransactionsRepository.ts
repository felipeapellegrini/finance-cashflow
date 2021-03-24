import { v4 } from 'uuid';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../ITransactionsRepository';
import {
  FindAll,
  ICreateTransactionDTO,
} from '../../dtos/HandleTransactionsDTO';

export default class TransactionsRepository implements ITransactionsRepository {
  private transactions: Transaction[] = [];

  public async findAll({
    user_id,
  }: FindAll): Promise<Transaction[] | undefined> {
    const transactions = this.transactions.filter(t => t.user_id === user_id);

    return transactions;
  }

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
    type,
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
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}
