import { Repository, getRepository } from 'typeorm';
import ITransactionsRepository from '../../../repositories/ITransactionsRepository';
import { ICreateTransactionDTO } from '../../../dtos/HandleTransactionsDTO';
import Transaction from '../entities/Transaction';

export default class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
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
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = this.ormRepository.create({
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

    await this.ormRepository.save(transaction);

    return transaction;
  }
}
