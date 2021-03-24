import { Repository, getRepository } from 'typeorm';
import ITransactionsRepository from '../../../repositories/ITransactionsRepository';
import {
  FindAll,
  ICreateTransactionDTO,
} from '../../../dtos/HandleTransactionsDTO';
import Transaction from '../entities/Transaction';

export default class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async findAll({
    user_id,
  }: FindAll): Promise<Transaction[] | undefined> {
    const transactions = await this.ormRepository.find({
      where: {
        user_id,
      },
    });

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
    parent_id,
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
      type,
      parent_id,
    });

    await this.ormRepository.save(transaction);

    return transaction;
  }
}
