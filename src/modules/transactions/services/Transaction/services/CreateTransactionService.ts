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
    type,
  }: ICreateTransactionDTO): Promise<Transaction[]> {
    const transactions: Transaction[] = [];
    const dueDate = new Date(due_date);
    const parentTransaction = await this.transactionsRepository.create({
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
      parent_id: undefined,
    });

    transactions.push(parentTransaction);

    if (installments > 1) {
      const childTransactions = [];

      for (let i = 2; i <= installments; i += 1) {
        const childTransaction = {
          user_id,
          account_id,
          subcategory_id,
          costcenter_id,
          installment: i,
          installments,
          transaction_date,
          due_date: new Date(dueDate.setMonth(dueDate.getMonth() + i - 1)),
          payment_date,
          total,
          description,
          status,
          type,
          parent_id: parentTransaction.id,
        };

        childTransactions.push(childTransaction);
      }

      childTransactions.map(async t => {
        const tr = {
          user_id: t.user_id,
          account_id: t.account_id,
          subcategory_id: t.subcategory_id,
          costcenter_id: t.costcenter_id,
          installment: t.installment,
          installments: t.installments,
          transaction_date: t.transaction_date,
          due_date: t.due_date,
          payment_date: t.payment_date,
          total: t.total,
          description: t.description,
          status: t.status,
          type: t.type,
          parent_id: t.parent_id,
        };

        const saveTransaction = await this.transactionsRepository.create(tr);
        transactions.push(saveTransaction);
      });
    }

    return transactions;
  }
}
