import { injectable, inject } from 'tsyringe';
import { ICreateTransactionDTO } from '@modules/transactions/dtos/HandleTransactionsDTO';
import ITransactionsRepository from '../../../repositories/ITransactionsRepository';
import Transaction from '../../../infra/typeorm/entities/Transaction';

@injectable()
export default class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({
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
    const transaction = await this.transactionsRepository.create({
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

    return transaction;
  }
}
