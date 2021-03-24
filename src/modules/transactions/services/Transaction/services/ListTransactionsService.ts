import { injectable, inject } from 'tsyringe';
import ITransactionsRepository from '../../../repositories/ITransactionsRepository';
import Transaction from '../../../infra/typeorm/entities/Transaction';
import { FindAll } from '../../../dtos/HandleTransactionsDTO';

@injectable()
class ListTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({
    user_id,
  }: FindAll): Promise<Transaction[] | undefined> {
    const transactions = await this.transactionsRepository.findAll({ user_id });

    return transactions;
  }
}

export default ListTransactionsService;
