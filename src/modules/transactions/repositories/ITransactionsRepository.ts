import Transaction from '../infra/typeorm/entities/Transaction';
import { ICreateTransactionDTO, FindAll } from '../dtos/HandleTransactionsDTO';

export default interface ITransactionsRepository {
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  findAll(data: FindAll): Promise<Transaction[] | undefined>;
}
