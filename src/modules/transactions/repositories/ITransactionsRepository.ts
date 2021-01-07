import Transaction from '../infra/typeorm/entities/Transaction';
import { ICreateTransactionDTO } from '../dtos/HandleTransactionsDTO';

export default interface ITransactionsRepository {
  create(data: ICreateTransactionDTO): Promise<Transaction>;
}
